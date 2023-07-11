import json

easy_animals = 'cat, dog, cow, pig, rat, bat, ant, bee, hen, owl, fox, duck, frog, lion, bear, goat, swan, deer, seal, crab, shark, tiger, zebra, jaguar, bison, moose, penguin, koala, giraffe, chimpanzee, kangaroo, hippopotamus, rhinoceros, elephant, alligator, crocodile, gorilla, orangutan, ostrich, peacock, chameleon, flamingo, raccoon, porcupine, armadillo, platypus, hedgehog, sloth, lizard, parrot, turkey, squirrel, hamster, turtle, snail, octopus, jellyfish, dolphin, whale, lobster, shrimp, squid, starfish, butterfly, ladybug, spider, mosquito, caterpillar, grasshopper, dragonfly, worm, eagle, hawk, falcon, parakeet, pigeon, sparrow, canary, flamingo, stork, pelican, toucan, peacock, swan, dove, owl, penguin, seagull, crow, robin, blue jay, hummingbird, woodpecker, sparrow, duck, chicken, finch, canary, kiwi'
medium_animals = 'cheetah, ocelot, rattlesnake, gila monster, barracuda, swordfish, scorpion, vulture, lynx, hyena, walrus, mandrill, lemur, tapir, iguana, porpoise, wombat, gazelle, chinchilla, marmot, nutria, peafowl, roadrunner, llama, ibex, alpaca, jackal, numbat, pangolin, wombat, caracal, dingo, mongoose, narwhal, octopus, quokka, yak, vampire bat, zebu, dhole, echidna, ferret, gecko, hare, ibis, jaguarundi, kinkajou, wallaby, lemming, meerkat, newt, oryx, puma, quail, ratel, serval, takin, urchin, vole, weasel, xerus, yabby, zorilla, aardwolf, baboon, capybara, dik-dik, elephant seal, fennec fox, genet, hamster, impala, jerboa, kiwi, loris, muntjac, numbat, okapi, potoroo, quokka, rhinoceros, sloth, tamarin, uakari, vervet, warthog, xenopus, yellow mongoose, zebrafish'
hard_animals = 'aardwolf, axolotl, binturong, capybara, dhole, echidna, fossa, gerenuk, harpy eagle, ibex, jaguarundi, kinkajou, loris, muntjac, numbat, okapi, potoroo, quokka, rhinoceros, sloth, tamarin, uakari, vervet, warthog, xenopus, yellow mongoose, zebrafish, albatross, bearded dragon, cassowary, dugong, emu, flying fox, gibbon, honey badger, ibis, jackalope, kookaburra, liger, manatee, numbat, ocelot, pangolin, quetzal, red panda, saiga, tapir, urchin, vampire bat, wallaroo, x-ray fish, yak, zorilla, aye-aye, bonobo, coati, dugite, echidna, fennec fox, gaur, hyrax, indri, jerboa, kudu, lemur, mongoose, numbat, okapi, pangolin, quokka, ratel, serval, takin, uakari, vervet monkey, warthog, xerus, yellow mongoose, zebu'

animals = []

for animal in easy_animals.split(', '):
    animals.append({
        "value": animal,
        "difficulty": 0
    })

for animal in medium_animals.split(', '):
    animals.append({
        "value": animal,
        "difficulty": 1
    })

for animal in hard_animals.split(', '):
    animals.append({
        "value": animal,
        "difficulty": 2
    })

data = json.dumps(animals)

with open('animals.json', 'w') as f:
    f.write(data)

print('Done!')
