# SkyMonitor
A Ryanair flight price scraper built for an exam.

Built using node and react.

It consists in both a server (with express) which stores data concerning:
- users
- monitored flights for user
- prices of monitored flights

and a fronted (webpage built with react) which is used for:
- user login / registration
- a from to search for flights and dates
- add a flight to the monitoring system
- see the monitored fight prices

Currently the webpage is a bit ugly, only the flight selection form can be considered "nice",
all other aspect are very basic and can be improved a lot, i.e. price visualization with d3js or with nice plotting.

## How does it work?
The functioning is really simple: periodically (using node-cron) the server fetch the prices
of the flights which have been added on the monitored-flight table by user, using the server remote api.
