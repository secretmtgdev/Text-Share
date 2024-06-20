# Notification system
## Objective
When signing up for the website, users should be notified of their new account generation. Users should also be notified when a file is deleted or shared with them.

## Undertstanding the scope of the problem
- **How will notifications be sent?**
    - Notifications will be through email and SMS message
- **Is the system real-time?**
    - The system is real-time and should notify users once a relevant state change has been made
- **What devices will be supported?**
    - phones, laptops, and desktops are supported devices
- **What triggers notifications?**
    - Actions performed on the client side
- **Will users be able to opt-out?**
    - Yes
- **How many notifications are sent out?**
    - No more than 100 emails and 100 SMS messages
    
## High level design
### Sending SMS notifications
- **What service is used?**
    - Twilio

### Sending email notifications
- **What services used?**
    - Mailchimp

![High level design](https://github.com/secretmtgdev/Kindle-like-prototype/blob/master/assets/design/high_level_design_notification_system.jpeg)

### Limitation issues
- Single point of failure: Currently there is only one server and if it goes down then that's it
- Hard to scale: Currently everything is on one server
    - We can mitigate this with horizontal scaling but this is not needed at the moment
- Performance bottelneck: It can take awhile for the 3p sources to get back
    - We can add messaging queues and have workers interact with the 3P sources rather than place everything in one server

### Notification server
We should ensure that the following are set:
- Provide APIs for the services to interact with
- Validate phone numbers and emails
- Query the database to fetch infromation needed for a notification
    - We could also leverage a cache to improve performance (not in scope)
- Pass notification data to Kafka messaging queue to perform parallel processeing
