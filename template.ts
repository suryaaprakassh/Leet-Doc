export const answerTemplate = (title: string, answer: string,time:string,space:string) => {
  return `
  <div id="outer-div">
    <a href="http://leetcode.com/problems/${title}" target="_blank" id="link-tag">${title}</a>
    <h3><b>Time Complexity :</b>${time}</h3>
    <h3><b>Space Complexity:</b>${space}</h3>
    <div id="code">
    ${answer}
    </div>
    <hr>
  </div>
`;
};

export const template = (content: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surya Prakash Solution</title>
    <style>
      body{
        font-family: Arial, sans-serif;
        background-color: #222831; 
        color: #EEEEEE;
      }
      hr{
      margin: 40px 0;
      background-color: #EEEEEE;
      }
      #link-tag {
        color: #76ABAE;
        text-decoration: none;
        font-size: 20px;
        font-weight: bold;
        text-transform: uppercase;
      }

      #code {
        background-color: #454545;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        overflow-x: auto;
      }
      #outer-div{
        margin: 20px;
      }
    </style>
</head>
<body>
${content}
<body> 
</html>`;
};
