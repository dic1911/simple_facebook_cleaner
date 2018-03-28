//if instant fail, and everything is setup correctly, simply relaunch the script

const puppeteer = require('puppeteer');

login = '030@gmail.com' //email(login) here
passwd = '' //password here

//set the type you're deleting here
like = true 		//removecontent (type 1)
comment = false 		//removecontent (type 1)
post = false 		//delete (type 2)
media = false 		//delete (type 2)

//url for mbasic activity page (it would work better if year/month is specified, like the one I set below)
url = 'https://mbasic.facebook.com/100023811560200/allactivity?timeend=1517471999&timestart=1514793600&sectionLoadingID=m_timeline_loading_div_1517471999_1514793600_25_&log_filter=likes&sectionID=month_2018_1'

//not used, feel free to ignore/remove
yr = [2018]
mon = [[3, 2, 1]];

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://mbasic.facebook.com');

	await page.type('input[id="m_login_email"]', login)
	await page.type('input[type="password"]', passwd)
	console.log("typed login info..")
	await page.screenshot({path: 'login030.png'})
	login = await page.click('input[type="submit"]', {delay: 10})
	console.log(login)
	page.waitForNavigation({waitUntil: "domcontentloaded"})
	console.log("now logged on shitbook..")
	
	if(like || comment){
		console.log("\nloading type 1\n")
		await page.goto(url);
	}
	while(like || comment){
		const response = await Promise.all([
			console.log("loading " + url),
			await page.goto(url),
			page.waitForNavigation({waitUntil: "domcontentloaded"}),
			console.log(Date() + " trying to delete.030"),
			del = page.click('a[href*="removecontent"]', {delay: 10}),
			await page.screenshot({path: 'current030.png'})
		]).catch(function(err){
			console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")
			console.log("looks like contents on the page were all removed.")
			console.log("or something is terriblely wrong,\ni'm buggy af anyways")
			console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")
			console.log(err)
			console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")
			page.goto(url)
			//like = false
		});
		console.log("++++++++++++++++++++++++++++++++++")
	}
	
	if(post || media){
		console.log("\nloading type 2\n")
		await page.goto(url);
	}
	while(post || media){
		const [response] = await Promise.all([
			console.log("loading " + url),
			await page.goto(url),
			page.waitForNavigation({waitUntil: "domcontentloaded"}),
			console.log(Date() + " trying to delete.030"),
			del = page.click('a[href*="activity/delete"]', {delay: 10}),
			await page.screenshot({path: 'current.png'})
		]).catch(function(err){
			console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")
			console.log("looks like contents on the page were all removed.")
			console.log("or something is terriblely wrong,\ni'm buggy af anyways")
			console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")
			console.log(err)
			console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")
		});
		console.log("++++++++++++++++++++++++++++++++++")
	}

	browser.close();
})();

