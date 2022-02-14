const { User, Wishlist } = require('../db/models');

function telegramBot(bot) {
  try {
    bot.setMyCommands([
      { command: '/wishlist', description: 'look at my wishlist' },
    ]);

    bot.on('message', async (msg) => {
      const telegramId = msg.from.id;
      if (msg.text === '/start') {
        bot.sendMessage(msg.chat.id, 'Add your Crew-Gifter ID in format ":123"');
      }

      if ((/^:\d+$/).test(msg.text)) {
        const userId = msg.text.split(':')[1];
        let user;
        try {
          user = await User.findOne({ where: { id: userId } });
          user.telegramId = telegramId;
          await user.save();
        } catch (error) {
          return bot.sendMessage(msg.chat.id, error.message);
        }
        bot.sendMessage(msg.chat.id, 'You have successfully connected to Crew-Gifter account');
        return bot.sendMessage(msg.chat.id, 'Now you can add your wishes');
      }

      let user;
      try {
        user = await User.findOne({ where: { telegramId }, raw: true });
      } catch (error) {
        return bot.sendMessage(msg.chat.id, error.message);
      }

      if (!user) {
        return bot.sendMessage(msg.chat.id, 'Firstly add your Crew-Gifter ID in format ":123"');
      }

      const userId = user.id;
      try {
        await Wishlist.create({ userId, wish: msg.text });
        return bot.sendMessage(msg.chat.id, 'Added');
      } catch (error) {
        return bot.sendMessage(msg.chat.id, error.message);
      }
    });
  } catch (error) { console.log(error.message); }
}

module.exports = telegramBot;
