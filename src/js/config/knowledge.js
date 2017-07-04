const Knowledge = [{
  questions: [
    ['weather'],
  ],
  response: 'check bbc weather for the latest',
  image: 'resource/image/weather.jpg',
  link: {
    src: 'http://www.bbc.co.uk/weather/',
    text: 'bbc weather'
  }

}, {
  questions: [
    ['hello'],
    ['whats up'],
    ['hi'],
  ],
  response: 'Hi, how can I help?',
  image: 'resource/image/weather.jpg',
  link: {
    src: 'http://www.bbc.co.uk/weather/',
    text: 'bbc weather'
  }

}, {
  questions: [
    ['url','doubleclick']
  ],
  response: 'Here is the link to double click',
  image: 'http://marketingland.com/wp-content/ml-loads/2014/07/doubleclick-1920.jpg',
  link: {
    src: 'https://www.google.com/doubleclick/studio/#creative',
    text: 'doubleclick'
  }

}, {
  questions: [
    ['standard','banner','sizes'],
    ['banner','sizes'],
  ],
  response: 'Here is the standard banner sizes:<br>300x250(MPU)<br>300x600(Double MPU)<br>970x250(Masthead)<br>728x90(Leaderboard)<br>160x600(Supersky)<br>120x600(Sky)',
  image: 'http://kathihumphries.com/wp-content/uploads/2014/03/banner_ads.jpg'

}, {
  questions: [
    ['url','csm']
  ],
  response: 'Here is the link to the CSM website',
  link: {
    src: 'https://www.csm.com',
    text: 'csm'
  },
  image: 'https://www.csm.com/getmedia/13bd7b1f-5b62-4a22-b680-1a4c9704b5b9/1200-x-400-US-Open.jpg.aspx?width=1200&height=400&ext=.jpg'

},
, {
  questions: [
    ['banner','file','size']
  ],
  response: 'Usually the banner file size should be between 150kb - 200kb.<br>Depends on ad platform.',
  image: 'http://kathihumphries.com/wp-content/uploads/2014/03/banner_ads.jpg'

}];

export default Knowledge;
