'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const prefix = '!';

client.once('ready', () => {
    console.log(`[login] Logged in as ${client.user.tag}!`);

    client.user.setUsername('')
    .then(user => console.log(`[satelita] Changed nickname: ${user.username}`))
    .catch(console.error);
    
    client.user.setAvatar('')
    .then(user => console.log(`[satelita] Changed avatar.`))
    .catch(console.error);

    client.channels.cache.forEach(kanal => {
      if (kanal.messages === undefined) return;
      kanal.messages.fetch({ limit: 100 })
          .then(message => {
              var romet = '';
              message.forEach(function (row) {
                  var image = ''
                  if (row.attachments.first()) {
                      image = row.attachments.first().url;
                  }
                  romet += `${row.author.username}: ${row.content} | kanał: ${row.channel.name} / ${row.channel.id}\n${image}`;
                  fs.writeFile(`logs/${kanal.name}.txt`, romet, function (err) {
                      if (err) return console.log(err);
                  });
              })
          })
          .catch(console.error);
  });
});

client.on('message', async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'priw' && message.author.id === '533691219419856896') {
    var text = args.slice(0).join(" ");
    message.mentions.users.first().send(text);
    message.delete().catch();
  }

  if (command === 'usunwiadomosc' && message.author.id === 'your user id') {
    message.channel.bulkDelete(2).catch(console.error);;
  }

  if (command === 'wyscig' && message.author.id === 'your user id') {
    const embed = new Discord.MessageEmbed()
      .setTitle('Zaczynamy wyścig rometów!')
      .setColor('0x3498db')
    message.channel.send(embed);
    setTimeout(async () => {
      var cars = [':motor_scooter:', ':motor_scooter:', ':motor_scooter:'];
      var random1 = Math.floor(Math.random() * cars.length);
      var random2 = Math.floor(Math.random() * cars.length);
      var random3 = Math.floor(Math.random() * cars.length);
      var car1 = cars[random1];
      var car2 = cars[random2];
      var car3 = cars[random3];
      var car1points = 0;
      var car2points = 0;
      var car3points = 0;
      var car1pos = 0;
      var car2pos = 0;
      var car3pos = 0;
      var flagMsg = '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀:checkered_flag:'; // 30 spacji
      const wiadomosc = await message.channel.send(`${car1}\n${car2}\n${car3}\n${flagMsg}`);
      var interval = setInterval(async () => {
        if (car1points >= 30) {
          clearInterval(interval);
          message.channel.send(`Ten romet wygral: ${car1} (nr1)`)
          return
        } else if (car2points >= 30) {
          clearInterval(interval);
          message.channel.send(`Ten romet wygral: ${car2} (nr2)`)
          return
        } else if (car3points >= 30) {
          clearInterval(interval);
          message.channel.send(`Ten romet wygral: ${car3} (nr3)`)
          return
        }
        var spacja = '⠀';
        var randomBlank1 = spacja.repeat(Math.floor(Math.random() * 6)); // random ilosc spacji do 5
        var randomBlank2 = spacja.repeat(Math.floor(Math.random() * 6)); // random ilosc spacji do 5
        var randomBlank3 = spacja.repeat(Math.floor(Math.random() * 6)); // random ilosc spacji do 5
        car1points = car1points + randomBlank1.length;
        car2points = car2points + randomBlank2.length;
        car3points = car3points + randomBlank3.length;
        car1pos = spacja.repeat(car1points)
        car2pos = spacja.repeat(car2points)
        car3pos = spacja.repeat(car3points)
        if (car1pos > 30) {
          car1pos = 30;
        } else if (car2pos > 30) {
          car2pos = 30;
        } else if (car3pos > 30) {
          car3pos = 30;
        }
        wiadomosc.edit(`${car1pos}${car1}\n${car2pos}${car2}\n${car3pos}${car3}\n${flagMsg}`);
      }, 2000);
    }, 1500);
  }

  const all_messages = [
    'id webhook',
    'token webhook'
  ];

  const all_messagesWebhook = new Discord.WebhookClient(all_messages[0], all_messages[1]);

  var image = ''
  var imgLine = '';
  if (message.attachments.first()) {
    image = message.attachments.first().url;
    imgLine = '\n';
  }

  switch (message.channel.name) {
    default:
        all_messagesWebhook.send(`\n${message.author.username}: ${message.content} | kanał: ${message.channel.name}/${message.channel.id}${imgLine}${image}`)
        .catch(console.error);
  }
});

client.login('token here');