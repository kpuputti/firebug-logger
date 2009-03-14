/*
Simple logger for Firebug ( http://getfirebug.com/ ).
Made by Kimmo Puputti ( kpuputti at gmail.com )
Somewhat inspired by log4j ( http://logging.apache.org/log4j/ ).

Usage:

- Include the script file before any scripts that use it:
e.g. <script type="text/javascript" src="firebug-logger.js"></script>

- Logging:
LOG.debug("This is a debug message.");
LOG.info("This is an info message.");
LOG.warn("This is a warning message.");
LOG.error("This is an error message.");

There are four levels of logging, DEBUG, INFO, WARN, and ERROR.
Default logging level is DEBUG. The logger only prints out logs
that have the same or higher level than the level that is set.

- Setting the level to WARN:
LOG.setLevel(LOG.levels.WARN);

- Getting the current level:
LOG.getLevel(); // DEBUG == 1, INFO == 2, WARN == 3, and ERROR == 4.

- Getting statistics of made logs:
LOG.printStats();

- Clearing statistics:
LOG.clearStats();

All messages by the logger are sent to the Firebug console.
*/
var LOG = function () {
    var level = 1;
    var getTime = function () {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return "<" + hours +
            ":" + minutes +
            ":" + seconds +
            "> ";
    };
    var count = {
        debug: 0,
        info: 0,
        warn: 0,
        error: 0
    };
    return {
        levels: {
            DEBUG: 1,
            INFO: 2,
            WARN: 3,
            ERROR: 4
        },
        getLevel: function () {
            return level;
        },
        setLevel: function (newLevel) {
            if (newLevel === this.levels.DEBUG) {
                level = this.levels.DEBUG;
            } else if (newLevel === this.levels.INFO) {
                level = this.levels.INFO;
            } else if (newLevel === this.levels.WARN) {
                level = this.levels.WARN;
            } else if (newLevel === this.levels.ERROR) {
                level = this.levels.ERROR;
            }
        },
        printStats: function () {
            try {
                var logs = count.debug + count.info + count.warn + count.error;
                console.log("##### Firebug Logger stats #####");
                console.log("# Debug: " + count.debug);
                console.log("# Info: " + count.info);
                console.log("# Warn: " + count.warn);
                console.log("# Error: " + count.error);
                console.log("# Total: " + logs);
                console.log("##### /Firebug Logger stats #####");
            } catch (e) {}
        },
        clearStats: function () {
            count.debug = 0;
            count.info = 0;
            count.warn = 0;
            count.error = 0;
        },
        debug: function (msg) {
            if (level <= this.levels.DEBUG) {
                try {
                    console.debug(getTime() + msg);
                    count.debug += 1;
                } catch (e) {}
            }
        },
        info: function (msg) {
            if (level <= this.levels.INFO) {
                try {
                    console.info(getTime() + msg);
                    count.info += 1;
                } catch (e) {}
            }
        },
        warn: function (msg) {
            if (level <= this.levels.WARN) {
                try {
                    console.warn(getTime() + msg);
                    count.warn += 1;
                } catch (e) {}
            }
        },
        error: function (msg) {
            if (level <= this.levels.ERROR) {
                try {
                    console.error(getTime() + msg);
                    console.trace();
                    count.error += 1;
                } catch (e) {}
            }
        }
    };
}();
