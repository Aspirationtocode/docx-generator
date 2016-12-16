const express = require('express');
const fs = require('fs');
const generateDocx = require('generate-docx');
const bodyParser = require('body-parser')

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', function(request, response) {
  response.render('pages/index', {language: 'javascript'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


app.use(bodyParser.urlencoded({extended: true}))

app.post('/generate', (req, res) => {
  const data = req.body;
  const options = {
    template: {
      filePath: 'public/input.docx',
      data: {
        student_firstname: data.student_firstname.slice(0, 1),
        student_lastname: data.student_lastname,
        student_patronym: data.student_patronym.slice(0, 1),
        group: data.group,
        student_code: data.student_code,
        professor_firstname: data.professor_firstname.slice(0, 1),
        professor_lastname: data.professor_lastname,
        professor_patronym: data.professor_patronym.slice(0, 1),
        year: data.year,
        subject: data.subject,
        topic: data.topic,
      }
    }
  }
  generateDocx(options, (error, buf) => {
    if (error) {
      console.error(error)
    } else {
      fs.writeFileSync('public/output.docx', buf)
      console.log('File written')
    }
  })
  res.render('pages/index');
})
