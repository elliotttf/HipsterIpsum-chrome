/**
 * @fileoverview Ipsum generator class.
 */

/**
 * @class
 * @param {int} para
 *   Number of paragraphs to generate.
 * @param {boolean} html
 *   Flag to include HTML tags or not.
 */
function Ipsum(para, html) {
  if (typeof para === 'undefined') {
    this.para = 4;
  }
  else {
    this.para = para;
  }

  if (typeof html === 'undefined') {
    this.html = true;
  }
  else {
    this.html = html;
  }
}

/**
 * @const
 */
Ipsum.latin = [
  'a','adipiscing','amet','arcu','at','auctor','bibendum','commodo','congue','curabitur','cursus','diam','donec','duis','eget','elementum','enim','eros','et','eu','fusce','gravida','in','integer','ipsum','justo','lectus','leo','ligula','lorem','maecenas','magna','malesuada','massa','mattis','mauris','metus','molestie','morbi','nam','nec','nibh','non','nulla','odio','orci','ornare','pellentesque','pharetra','porta','porttitor','proin','quam','quisque','risus','rutrum','sagittis','sapien','sed','sem','sit','sodales','tellus','tempus','ultricies','urna','ut','vitae','vivamus','vulputate'
];

/**
 * @const
 */
Ipsum.hipster = [
  '+1',
  '8-bit',
  'artisan',
  'bahn mi',
  'before they sold out',
  'bicycle',
  'biodiesel',
  'brunch',
  'craft beer',
  'cred',
  'farm-to-table',
  'fixie',
  'food truck',
  'hoodie',
  'indie',
  'keytar',
  'mustache',
  'organic',
  'specs',
  'skateboard',
  'tofu',
  'vegan',
  'vinyl',
  'viral',
  "you probably haven't heard of them",
  'Austin',
  'Brooklyn',
  'DIY',
  'PBR',
  'Portland',
  'San Francisco',
  "Tom's",
  'VHS'
];

/**
 * Returns a HipsterIpsum string.
 */
Ipsum.prototype.get = function() {
  var ret = '';
  var wCount = 0;
  var hipDist = Math.round(Math.random() * (10 - 3) + 3);

  // Create the correct number of paragraphs.
  for (var p = 0; p < this.para; p++) {
    if (this.html) {
      ret += '<p>';
    }

    // Create a random number of sentences.
    var numSen = Math.round(Math.random() * (10 - 4) + 4);
    for (var s = 0; s < numSen; s++) {
      // Create a random number of words for each sentence.
      var sLen = Math.round(Math.random() * (20 - 15) + 15);
      for (var w = 0; w < sLen; w++, wCount++) {
        var i = 0;
        var word = '';
        if (wCount % hipDist === 0) {
          i = Math.round(Math.random() * Ipsum.hipster.length);
          word = Ipsum.hipster[i];
        }
        else {
          i = Math.round(Math.random() * Ipsum.latin.length);
          word = Ipsum.latin[i];
        }

        // Capitalize the first word in the sentence.
        if (w === 0) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }

        ret += word;

        if (w + 1 < sLen) {
          ret += ' ';
        }
      }
      ret += '.';

      if (s + 1 < numSen) {
        ret += ' ';
      }
    }

    if (p + 1 < this.para) {
      if (this.html) {
        ret += "</p>\n";
      }
      else {
        ret += "\n\n";
      }
    }
  }

  return ret;
};

