var CronJob = require('cron').CronJob;
var job = new CronJob(
    '* 04 05 * * *',
    function () {
        console.log('You will see this message every 30 second');
    },
    null,
    true,
    'Asia/Ho_Chi_Minh'
);

job.start()