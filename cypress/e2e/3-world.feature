Feature: World

  Scenario: Help button works
    Given I am on the start page
    When I choose "help"
    Then I should see the help screen
    And I should see a description
    And I should see a picture with the src "imgs/help.jpg"


  Scenario Outline: Navigation and information (<name>)
    Given I am on the start page
    When I choose all "<directions>"
    Then I should see a description
    And I should see a picture with the src "<imageSrc>"

    Examples:
      | name         | directions     | imageSrc                   |
      | outside cafe |                | imgs/cloud-forest-cafe.jpg |
      | bar          | north,east     | imgs/bar.jpg               |
      | street       | north          | imgs/street.jpg            |
      | music        | south,west     | imgs/music-scene.jpg       |
      | country side | south          | imgs/country-side.jpg      |
      | inside cafe  | enter the cafe | imgs/inside-cafe.jpg       |

  Scenario: Win information
    Given I am on the start page
    And the player is invincible
    When I play the win path
    Then I should see a description
    And I should see a picture with the src "imgs/win.jpg"

  Scenario: Fail information
    Given I am on the start page
    When I click "wait" until I lose
    Then I should see a description
    And I should see a picture with the src "imgs/dead.jpg"
