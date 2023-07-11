import json

wordsString = 'Attack on Titans, Naruto, Uzumaki Naruto, Uchiha Sasuke, Haruna Sakura, Hatake Kakashi, Eren Jaeger, Jiraiya, Eren Yeager, Mikasa Akerman, Levi Akerman, Hangie Zoe, Berthold Hoover, Reiner Braum, Annie Leonhard, Kenny Akerman, Erwin Smith, Eldia, Paradise island, Akatsuki, Deidara, haku, zabuza, sasori, kisame, kakuzu, hidan, orochimaru, zetsu, pain, konan, Uchiha Itachi, Itadori, Satoru Gojo, Megumi Fushiguro, Nobara Kugisaki, Toji Fushiguro, Getou Suguru, Pikachu, Charizard, Bukbazaur, Lucario, Rasengan, Monkey d Luffy, Ichigo Kurasaki, Aizen Sosuke, Byakuya Kuchiki, Bankai, Zanka no tachi, Yoruichi, Retsu Unohana, Urahara Kiske, Rukia Kuchiki, Kenpachi Zaraki, Hirako Syndi, Bankai: Minazuki, Mayuri, Shigekuni Genryusai, Rendi Abarai, Yagami Light, L, Misa Misa, Ryuk, Ukitake, Mello, Niya, Teru Mikami, Soitsiru Yagami, Missora Naomi, Rem, Touta Matsuda, Watari, Higuchi, Kira, Uryuu Isida, Ulquiorra Shifer, Bankai: Katen Kyukutsku Karamate Sinjyu, Baknai: Sembonzakura kageyoshi, Bankai: Tensa zangetsu, Tensa Zangetsu, Zangetsu, Ryomen Sukuna, Maki Zen’in, Panda, Atsuya Kusakabe, Yuta Okottsu, Inumaki, Maki Zen’in, Gakuganji, Mai zen’in, Kokichi Muta, Noritoshi Kamo, Aoi Todo, Nishimiya, Nanami, Mei Mei, Master Tengen, Joseph Joestar, Jhonathan Joestar, Jotaro Kujo, Dio Brando, Higashikata Josuke, Kira Yoshikage, Shigechi, Okuyasu, Koichi, Giorno Giovanna, Muhammad Abdul, Diavolo, Doppio, Ceaser Zeppeli, Kakyoin, Jean-pier Polnareff, The World, Star Platinum, Made in Heaven, Killer Queen, Crazy Diamond, Gold Experience, King Crimson, Bruno Bucciarati, Naranca, Aerosmith, Gvido Mista, Sex pistols, Fugo, Antonio Zeppeli, Joylne Joestar, Stone Ocean, Emporio, Weather Report, Enrico Pucci, SpeedWagon, Lisa Lisa, Gyro Zeppeli, Jhonny Joestar, Funny Valentine, Diego Brando, Dario Brando, Kishibe Rohan, Higashikata J8ske, Erina Pendlthon, Anasui, Hayato, Hol Horse, Hot Pants, Josephumi Kujo, Coco Jumbo, Ermes Castello, Daiya Higashikata, Abbacchio, Lucy Steel, Scary Monsters, Nicholas Joestar, Lelouch vi Britannia, C.C., Suzaku Kururugi, Kallen Kozuki, V.V., Charles zi Britannia, Shirley Fanette, Cornelia li Britannia, Kaguya Sumeragi, Kaguya, Todhoh Kyoshiro, Clovis la Britannia, Shnayzel el Britannia, Mao, Darlton, Requiem arrow, golden spin, napkin’s rule, geass, damocles, nightmare, Lancelot Albhion, Nina Einshtein, Nunnaly vi Britannia, Guilford, Guino Weinberg, Freya, Senku Ishigami, Taiju, Yuzuriha, Kohaku, Chrome, Ginro, Kinro, Suika, Gen Asagiri, Kaseki, Ukyo, Tsukasa Shishio, Mirai Shishio, Homura, Hyoga, Nanami, Ruri, Professor Xeno, Byakuya Ishigami, Jojo Bizarre Adventure, Doctor Stone, Jujutsu Kaisen, Bleach, Code Geass, Guts, Griffith, Sephiroth, Zodd, Konni Springer, Sasha Braus, Zeke Yeager, Dot Pixies, Hannes, Theo Maggath, Porco Galliard, Historia Reyis, Ymir Fritz, Petra, Jean Kirshtein, Yelena, Gabi, Floch, Onyankopon, Rumbling, Titan, Armored titan, Colossal titan, Jaw titan, Warhammer titan, The founder titan, Female titan, Beast titan, Michael Jackson, Muzan, Nezuko, Tanjiro, Rengoku, Kokushibo, Gyutaro, Doma, Akaza'
wordsArray = wordsString.split(', ')
words = []

for word in wordsArray:
    words.append({
        "value": word,
        "difficulty": 0
    })

data = json.dumps(words)

with open('anime.json', 'w') as f:
    f.write(data)

print('Done!')
