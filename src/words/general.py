import json

easy = 'apple, ball, cat, dog, egg, fish, gate, hat, ice, jar, key, lamp, map, nose, owl, pen, queen, rain, sun, table, umbrella, van, window, xylophone, yogurt, zoo, arm, bed, chair, desk, ear, fan, guitar, hand, ink, jacket, kite, lemon, mouse, napkin, orange, pillow, quilt, rope, spoon, tablecloth, umbrella, violin, wallet, x-ray, yarn, zipper, alarm, book, cup, door, eggplant, fork, glass, hammer, ice cream, jacket, knife, ladder, mug, newspaper, orange, pencil, quilt, radio, socks, tie, underwear, vase, watch, xylophone, yogurt, zipper, apple, bag, candle, dice, envelope, flower, glasses, hat, ice cube, juice, kite, ladder, mirror, notebook, onion, paper, queen, rug, shoes, table, umbrella, vase, watch, xylophone, yogurt, zipper, ant, bird, caterpillar, dog, elephant, frog, giraffe, horse, insect, jellyfish, kangaroo, lion, monkey, nightingale, octopus, penguin, quail, rabbit, snail, turtle, unicorn, vulture, whale, xenopus, yak, zebra, apple, bread, carrot, donut, egg, fish, grape, honey, ice cream, jam, kiwi, lemon, mango, noodles, orange, pineapple, quiche, rice, strawberry, tomato, udon, vanilla, watermelon, xigua, yogurt, zucchini, alarm, balloon, camera, dice, eraser, fan, guitar, headphones, iPod, jacket, keyboard, lamp, microphone, notebook, orange, pencil, question, remote, scissors, tablet, umbrella, vacuum, wallet, x-ray, yo-yo, zipper'
medium = 'chair, table, phone, tree, door, window, clock, pen, shoe, hat, shirt, pants, lamp, computer, bag, wallet, mirror, picture, garden, beach, ball, bike, watch, cookie, cake, pizza, bread, soap, towel, toothbrush, shampoo, brush, comb, radio, television, music, bed, pillow, blanket, cup, spoon, fork, knife, plate, pot, pan, sink, faucet, basket, scissors, glue, tape, pencil, eraser, ruler, marker, chalk, calendar, ladder, broom, vacuum, globe, camera, headphones, sunglasses, scarf, alarm, calculator, envelope, stapler, speaker, drawer, tablecloth, remote, zipper, chalkboard, notebook, glasses, magnet, umbrella, stove, vase, carpet, candle, soap, glasses, magnet, umbrella, plate, vase, clock, button, zipper, sink, blanket, key, wallet, book, lamp, hat, computer, bag, picture, garden, beach, bike, cookie, bread, towel, brush, comb, radio, television, music, pillow, cup, fork, knife, pot, pan, faucet, basket, scissors, tape, pencil, ruler, marker, calendar, broom, vacuum, camera, headphones, scarf, alarm, envelope, stapler, speaker, drawer, tablecloth, remote, zipper, chalkboard, notebook, magnet, umbrella, stove, vase, carpet, candle, glasses, plate, clock, sink, blanket, wallet, book, hat, computer, bag, garden, beach, bike, cookie, bread, towel, brush, comb, radio, television, music, pillow, cup, fork, knife, pot, pan, faucet, basket, tape, pencil, ruler, marker, calendar, vacuum, camera, headphones, scarf, alarm, envelope, stapler, speaker, drawer, tablecloth, remote, chalkboard, notebook, magnet, umbrella, stove, vase, carpet, candle, glasses, plate, clock, sink, wallet, book, hat, computer, garden, beach, cookie, bread, brush, comb, radio, television, music, pillow, cup, fork, knife, pot, pan, faucet, basket, tape, pencil, ruler, marker, calendar, vacuum, headphones, scarf, envelope, stapler, speaker, drawer, remote, chalkboard, notebook, magnet, umbrella, stove, carpet, candle, glasses, plate, clock, sink, wallet, hat, computer, garden, beach, bread, brush, comb, radio, pillow, cup, fork, pot, faucet, basket, tape, pencil, ruler, marker, calendar, headphones, envelope, stapler, speaker, drawer, remote, chalkboard, magnet, umbrella, stove, carpet, glasses, plate, sink, wallet, hat, bread, brush, radio, pillow, cup, faucet, tape, pencil, marker, calendar, headphones, envelope, speaker, drawer, remote, chalkboard, magnet, stove, carpet, plate, sink, hat, bread, pillow, faucet, pencil, calendar, speaker, remote, carpet, sink, bread, pillow, faucet, pencil, calendar, remote, carpet'
hard = 'sphygmomanometer, thalassophobia, chrysanthemum, pneumonoultramicroscopicsilicovolcanoconiosis, xylophone, synecdoche, zucchini, anemone, euonymus, hellebore, glockenspiel, hibiscus, calliope, xerophyte, hemidemisemiquaver, rhododendron, stegosaurus, quokka, volkswagen, kohlrabi, physiotherapy, ergonomics, chinchilla, narwhal, triceratops, zebra, ophthalmology, herpetology, geranium, anesthesiology, ornithology, neurosurgery, gastroenterology, archeology, myrmecology, entomology, ichthyology, chiropractic, audiologist, rheumatology, linguistics, etymology, hepatology, nephrology, glaciology, herpetology, arachnology, virology, cytology, laryngology, urology, endocrinology, nephrology, cartography, paleontology, botany, venipuncture, phlebotomy, audiology, radiology, immunology, oncology, anesthesiology, zoology, embryology, podiatry, optometry, taxonomy, entomology, kinesiology, paleontology, biotechnology, ichthyology, orthopedics, gynecology, pediatrics, obstetrics, geriatrics, cardiology, psychiatry, neurology, dermatology, pulmonology, orthodontics, optometry, epidemiology, hematology, histology, pathophysiology, anemia, aneurysm, angina, appendicitis, arrhythmia, arthritis, bronchitis, hepatitis, hypertension, insomnia, meningitis, pneumonia, schizophrenia, sinusitis, tracheotomy, appendectomy, hysterectomy, mastectomy, vasectomy, cholecystectomy, nephrectomy, tonsillectomy, rhinoplasty, cardiotomy, carpal, phalanges, metatarsals, femur, clavicle, scapula, mandible, sternum, tibia, fibula, ulna, radius, humerus, patella, metacarpals, tarsals, coccyx, thoracic, lumbar, cervical, cerebellum, hypothalamus, pancreas, thyroid, gallbladder, pituitary, appendix, spleen, pharynx, esophagus, trachea, larynx, ureter, urethra, oesophagus, duodenum, ileum, ileum, rectum, fallopian, vas deferens, placenta, amniotic, fetus, neonate, umbilical, ovaries, testes'

words = []

for word in easy.split(', '):
    words.append({
        "value": word,
        "difficulty": 0
    })

for word in medium.split(', '):
    words.append({
        "value": word,
        "difficulty": 1
    })

for word in hard.split(', '):
    words.append({
        "value": word,
        "difficulty": 2
    })

data = json.dumps(words)

with open('general.json', 'w') as f:
    f.write(data)

print('Done!')
