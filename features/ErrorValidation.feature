Feature: Greeting


		@sample
		Scenario Outline: Say hello
		Given a login to Ecommerce2 application with "<username>" and "<password>"
		Then Verify Error message is displayed

		 Examples:
          | username    	  | 	password  |
          | anshika@gmail.com | Iamking@000   |


		  
		Scenario Outline: Say hello2
		Given a login to Ecommerce2 application with "<username>" and "<password>"
		Then Verify Error message is displayed

		 Examples:
          | username    	  | 	password  |
          | anshika@gmail.com | Iamking@000   |

		  @sample
		Scenario Outline: Say hello2
		Given a login to Ecommerce2 application with "<username>" and "<password>"
		Then Verify Error message is displayed

		 Examples:
          | username    	  | 	password  |
          | anshika@gmail.com | Iamking@000   |
       
       
