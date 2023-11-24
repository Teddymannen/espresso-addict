Feature: Testing gameplay functions

  Scenario: Initial stats exist and have set values
    Given I am on the start page
    Then I should see "health" value at 50
    And I should see "money" value at 10
    And I should see "espressocups" value at 0
    And I should see "nothing cool" in "bag"

  Scenario: Values update when playing the game
    Given I am on the start page
    When I choose "enter the cafe"
    And I choose "buy an espresso"
    Then I should see "health" value at 60
    And I should see "money" value at 5
    And I should see "espressocups" value at 1

  Scenario: Bag content updates when waiting at the bar
    Given I am on the start page
    And the player is invincible
    When I choose "north"
    And I choose "east"
    And I choose "wait" until I have "a can of beer" in my bag
    Then I should see "a can of beer" in "bag"

  Scenario: Health bar percentage is correctly aligned with health value
    Given I am on the start page
    When I choose "enter the cafe"
    And I choose "buy an espresso"
    Then I should see "health" value at 60
    And I should see "health" "progress" bar at "width: 60%;"

  Scenario Outline: All descriptions are shown when waiting
    Given I am on the start page
    And the player is invincible
    When I choose all "<directions>"
    Then <descriptionCount> descriptions should be seen after I "wait" a few times

    Examples:
      | directions     | descriptionCount |
      |                | 2                |
      | north,east     | 3                |
      | north          | 2                |
      | south,west     | 3                |
      | south          | 2                |
      | enter the cafe | 3                |
