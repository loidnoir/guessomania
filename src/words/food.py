import json

easy_food = 'apple, banana, carrot, bread, cheese, tomato, rice, egg, milk, orange, pasta, potato, chicken, beef, fish, yogurt, butter, cake, cookie, lettuce, cucumber, strawberry, watermelon, grape, pineapple, corn, toast, jam, honey, popcorn, chocolate, pizza, sandwich, soup, pancake, waffle, oatmeal, cereal, muffin, donut, ice cream, bacon, sausage, ham, peas, broccoli, onion, garlic, mushroom, avocado, lemon, lime, grapefruit, blueberry, raspberry, water, coffee, tea, soda, juice, burger, hot dog, fries, ketchup, mustard, mayonnaise, mustard, salt, pepper, sugar, vinegar, olive oil, soy sauce, peanut butter, jelly, syrup, cheeseburger, spaghetti, lasagna, tacos, burritos, nachos, quesadilla, guacamole, salsa, sushi, fried rice, curry, dumplings, stir-fry, omelette, scrambled eggs, Caesar salad, Greek salad, Caesar dressing, ranch dressing, BBQ sauce, teriyaki sauce, brownie'
medium_food = 'bagel, croissant, quinoa, couscous, lentils, hummus, tofu, edamame, falafel, gazpacho, paella, risotto, gnocchi, bruschetta, calzone, quesadilla, empanada, kimchi, sushi, pho, ramen, pad thai, bibimbap, tikka masala, curry, tempura, dumplings, pierogi, goulash, schnitzel, pita, tahini, tabbouleh, baba ganoush, ratatouille, ceviche, jambalaya, chimichanga, bratwurst, sauerkraut, crepe, tiramisu, cannoli, panna cotta, baklava, macarons, profiteroles, pate, bouillabaisse, beef Wellington, stroganoff, fajitas, enchiladas, churros, sashimi, dim sum, miso soup, nigiri, bulgogi, pad see ew, bibingka, dolma, spanakopita, shawarma, tandoori, dosa, falooda, kung pao, gyoza, bisque, escargot, foie gras, aioli, maki roll, wonton soup, quiche, croutons, pumpernickel, gefilte fish, tapenade, mascarpone, frappuccino, chow mein, fondue, korma, babka, muesli, stroopwafel, kimchi, samosa, prosciutto, arancini, aioli, bouillabaisse, gazpacho'
hard_food = 'souffle, creme brulee, consomme, carpaccio, escabeche, bouillabaisse, foie gras, borscht, tournedos, quenelle, roulade, zabaglione, confit, amuse-bouche, gnocchi, blini, croquembouche, gravlax, gougeres, pappardelle, terrine, prosciutto, sauerbraten, goulash, souvlaki, tandoori, vindaloo, cassoulet, tartare, haggis, pate de campagne, crème caramel, matzo ball soup, chateaubriand, beef wellington, chowder, schnitzel, frittata, schwarma, risotto, pirozhki, beef bourguignon, ceviche, paella, ratatouille, spanakopita, linguine, coq au vin, bouillabaisse, crepe suzette, saffron rice, caprese salad, gazpacho, tiramisu, monte cristo sandwich, fajitas, jambalaya, scampi, churros, babka, crostini, souvlaki, dolma, pierogi, arancini, tahini, spanakopita, shawarma, satay, baba ganoush, nicoise salad, kimchi, gyoza, korma, baklava, quiche, tapenade, tagine, kofta, escargot, fondue, ratatouille, pierogi, samosa, tabbouleh, gravlax, borscht, paella, crème brulee'

foodObject = []

for food in easy_food.split(', '):
    foodObject.append({
        "value": food,
        "difficulty": 0
    })

for food in medium_food.split(', '):
    foodObject.append({
        "value": food,
        "difficulty": 1
    })

for food in hard_food.split(', '):
    foodObject.append({
        "value": food,
        "difficulty": 2
    })

data = json.dumps(foodObject)

with open('food.json', 'w') as f:
    f.write(data)

print('Done!')
