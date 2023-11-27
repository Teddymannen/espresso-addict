Feature: Replay

  Scenario: Lose and play again
    Given I am on the start page
    When I click "Wait" until I lose
    And I click "play again"
    Then I should see the start page
    And I should have more than 0 health

  Scenario: Win and play again
    Given I am on the start page
    And the player is invincible
    When I choose "go south"
    And I choose "go west"
    And I choose "wait" until I can choose "jam with the band"
    And I choose "jam with the band"
    And I choose "go east"
    And I choose "go north" 2 times
    And I choose "go east"
    And I choose "wait" until I have "a can of beer" in my bag
    And I choose "go west"
    And I choose "go south"
    And I choose "enter the cafe"
    And I choose "buy an espresso" 3 times
    And I choose "wait" until I can choose "give beer to barista"
    And I choose "give beer to barista"
    And I choose "play again"
    Then I should see the start page

# We test the following scenario with selenium

# Scenario: Play the win path multiple times
#   Given I am on the start page
#   When I play the win path 1 times and save fail count
#   Then I should have less than 5 fails

