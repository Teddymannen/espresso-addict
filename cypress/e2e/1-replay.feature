Feature: Replay

    Scenario: Lose and play again
        Given I am on the start page
        When I click "Wait" until I lose
        And I click "play again"
        Then I should see the start page
        And I should have more than 0 health