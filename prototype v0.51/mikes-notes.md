Misc.
=====

## Analytics code from Lauren

> We’ll need to add some custom code to pick up everything after the # tag – this is what we did for the Repay Student Debt Assistant (http://www.consumerfinance.gov/paying-for-college/repay-student-debt/#Question-1)
Page snippet:

```JS
var _gaq=[['_setAccount','UA-20466645-3'],['_setDomainName', '.consumerfinance.gov']];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s)}(document,'script'));
$(function(){
    var prev_hash_val = location.hash;
    _gaq.push(["_trackPageview", location.pathname + location.search + location.hash]);

    $(window).bind("hashchange", function (e) {
        if(prev_hash_val != location.hash){
            prev_hash_val = location.hash;
            _gaq.push(["_trackPageview", location.pathname + location.search + location.hash]);
        }
    });
});
```
