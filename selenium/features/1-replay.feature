Feature: Replay

  Scenario: Lose and play again
    Given I am on the start page
    When I click "Wait" until I lose
    And I click "Play again"
    Then I should see the start page
    And I should have more than 0 health

  Scenario: Win and play again
    Given I am on the start page
    And the player is invincible
    When I choose "Go south"
    And I choose "Go west"
    And I choose "Wait" until I can choose "Jam with the band"
    And I choose "Jam with the band"
    And I choose "Go east"
    And I choose "Go north" 2 times
    And I choose "Go east"
    And I choose "Wait" until I have "a can of beer" in my bag
    And I choose "Go west"
    And I choose "Go south"
    And I choose "Enter the cafe"
    And I choose "Buy an espresso" 3 times
    And I choose "Wait" until I can choose "Give beer to barista"
    And I choose "Give beer to barista"
    And I choose "Play again"
    Then I should see the start page

  Scenario: Play the win path multiple times
    Given I am on the start page
    When I play the win path 20 times and save fail count
    Then I should have less than 5 fails

