Feature: Testing gameplay functions

  Scenario: Player stats exist
    Given I am on the start page
    Then I should see "health" value at 50
    And I should see "money" value at 10
    And I should see "espressocups" value at 0
    And I should see "nothing cool" in "bag"

# Initial conditions
# Values uppdateras
# Vad man har i sin väska uppdateras efter man gått till ?baren?
# Progress Baren visar rätt andel
# Man får alla alternativ som finns
