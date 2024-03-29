import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs";
import { answerTemplate, template } from "./template";

function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

let browser: Browser;
let page: Page;
let answers="";

const saveCookies = async () => {
  const cookies = await page.cookies();
  // You can save cookies to a file or a database for later use
  fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));
};

const loadCookies = async () => {
  await page.setCookie(...JSON.parse(fs.readFileSync("cookies.json", "utf-8")));
};
async function loginToLeetCode(username: string, password: string) {
  try {
    await page.goto("https://leetcode.com/accounts/login/", {
      waitUntil: "domcontentloaded",
    });

    await delay(5000);
    await page.type("#id_login", username);
    await page.type("#id_password", password);

    // await page.click("#signin_btn");

    await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    await delay(10000);
    // Print the contents of the page
    // const pageContent = await page.content();
    // console.log("Page content:", pageContent);
    console.log("Login successful!");
    await saveCookies();
  } catch (error) {
    console.error("Login failed:", error);
  }
}

async function getProblems(problem: Problem) {
  const url = `https://leetcode.com/problems/${problem.tag}/submissions/`;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await delay(5000);
    await page.click(".h-full.overflow-auto > div:first-child");
    await delay(5000);
    const codeContent = await page.evaluate(() => {
      const element =document.querySelector("code");
      return element?.outerHTML;
    });
    if(!codeContent){
      answers+=answerTemplate(problem.tag, "Not Yet Solved","","");
    }else{
      answers+=answerTemplate(problem.tag, codeContent,problem.time,problem.space);
    }
    await delay(5000);
  
  } catch (error) {
    console.error("Login failed:", error);
  }
}

const username = "leetdocstest";
const password = "test@123";


type Problem={
  tag:string;
  time:string;
  space:string;
}

const parseProblem=():Problem[]=>{
  const problems=[]
  const file= fs.readFileSync("prob.txt","utf-8");
  for(let line of file.split("\n")){
    if(line==""){
      break;
    }
    const [tag,time,space]=line.split(" ");
    problems.push({tag,time,space});
  }
  return problems;
}

async function main() {
  browser = await puppeteer.launch({headless: false});
  page = await browser.newPage();
  await loadCookies();
  const login = await page.evaluate(() => {
    return !!document.querySelector(".avatar-user");
  });
  if (login) {
    await loginToLeetCode(username, password);
  }
  const problems=parseProblem();
  for(let problem of problems){
    await getProblems(problem);
  }
  await browser.close();

  const content = template(answers);

  fs.writeFileSync("dom.html", content);
}
main();

// console.log(parseProblem());
