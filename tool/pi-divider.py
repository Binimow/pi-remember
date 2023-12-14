pi_decimals_sequence = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986" #280348253421170679"

def divide_pi(decimals, sublist_size, group_size):
    # Convert the string of decimals into a list of integers
    decimals_list = [int(digit) for digit in decimals]
    
    # Divide the list into sublists of size sublist_size
    sublists = [decimals_list[i:i+sublist_size] for i in range(0, len(decimals_list), sublist_size)]
    
    # Group the sublists into larger lists of size group_size
    grouped_sublists = [sublists[i:i+group_size] for i in range(0, len(sublists), group_size)]
    
    return grouped_sublists

pi_divided = divide_pi(pi_decimals_sequence, 2, 3)

#Load pao-system.csv into a dict of dict where the key is Chiffres and the values of the child dict are Personne, Action, Objet
import csv
pao_system = {}
with open('pao-system.csv', newline='', encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        pao_system[row['Chiffres']] = {'Personne': row['Personne'], 'Action': row['Action'], 'Objet': row['Objet']}

# I want an infinite generator which will be ["Personne", "Action", "Objet"

# Create a string where each digit is replaced by the corresponding PAO
def pi_to_pao(pi_divided, pao_system):
    pao_string = ""
    for group in pi_divided:
        if len(group) < 3:
            return pao_string
        personne_num = ''.join(map(str, group[0]))
        action_num = ''.join(map(str, group[1]))
        objet_num = ''.join(map(str, group[2]))
        pao_string += pao_system[personne_num]['Personne'] + " "
        pao_string += pao_system[action_num]['Action'] + " "
        pao_string += pao_system[objet_num]['Objet'] + " "
        pao_string += "\n"
        
    return pao_string

# Test the function
print(pi_to_pao(pi_divided, pao_system))\

# Plug a AI that will read the pao_string and output a story
# Use the AI you want


