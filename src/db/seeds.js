import { Entry, realm } from '../models/realm'

// Deletes database before seeding!
realm.write(() => {
  realm.deleteAll()
})

const entries = [
  {
    "content": "Life isn’t about getting and having, it’s about giving and being.",
    "category": "Maxim", 
    "author": "Kevin Kruse",
    "tags:": ["life"]
  },
  {
    "content": "Whatever the mind of man can conceive and believe, it can achieve.",
    "category": "Advice", 
    "author": "Napoleon Hill",
    "tags": ["mind", "achieve"]
  },
  {
    "content": "Strive not to be a success, but rather to be of value.", "category": "Maxim",
    "author": "Albert Einstein",
    "tags": ["strive", "success", "value"]
  },
  {
    "content": "You miss 100% of the shots you don’t take.",
    "category": "Advice", 
    "author": "Wayne Gretzky",
    "tags": ["shots", "chance", "opportunity", "miss", "motivation"]
  },
  {
    "content": "I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.",
    "category": "Quote", 
    "author": "Michael Jordan",
    "tags": ["chance", "failure", "opportunity", "success"]
  },
  {
    "content": "The most difficult thing is the decision to act, the rest is merely tenacity.", 
    "category": "Advice", 
    "author": "Amelia Earhart",
    "tags": ["action", "decision", "motivation"]
  },
  {
    "content": "Definiteness of purpose is the starting point of all achievement.",
    "category": "Maxim",
    "author": "W. Clement Stone",
    "tags": ["purpose", "achievement"]
  },
  {
    "content": "Life is what happens to you while you’re busy making other plans.", 
    "category": "Quote", 
    "author": "John Lennon",
    "tags": ["life", "plans"]
  },
  {
    "content": "Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover.", 
    "category": "Advice", 
    "author": "Mark Twain",
    "tags": ["explore", "dream", "discover"]
  },
  {
    "content": "The most common way people give up their power is by thinking they don’t have any.", 
    "category": "Advice", 
    "author": "Alice Walker",
    "tags": ["power"]
  },
  {
    "content": "The mind is everything. What you think you become.", "category": "Advice", 
    "author": "Buddha",
    "tags": ["personality", "growth", "mind"]
  },
  {
    "content": "The best time to plant a tree was 20 years ago. The second best time is now.", 
    "category": "Maxim", 
    "author": "Chinese Proverb",
    "tags": ["now", "action", "tree"]
  },
  {
    "content": "An unexamined life is not worth living.", 
    "category": "Maxim", 
    "author": "Socrates",
    "tags": ["life"]
  },
  {
    "content": "Eighty percent of success is showing up.", 
    "category": "Advice", 
    "author": "Woody Allen",
    "tags": ["success"]
  },
  {
    "content": "Your time is limited, so don’t waste it living someone else’s life.",
    "category": "Advice", 
    "author": "Steve Jobs",
    "tags": ["time", "life"]
  },
  {
    "content": "Winning isn’t everything, but wanting to win is.",
    "category": "Maxim", 
    "author": "Vince Lombardi",
    "tags": ["winning", "want", "motivation"]
  },
  {
    "content": "I am not a product of my circumstances. I am a product of my decisions.",
    "category": "Maxim", 
    "author": "Stephen Covey",
    "tags": ["decisions", "circumstance", "self"]
  },
  {
    "content": "Every child is an artist.  The problem is how to remain an artist once he grows up.", "category": "Quote", "author": "Pablo Picasso"
  },
  {
    "content": "You can never cross the ocean until you have the courage to lose sight of the shore.", "category": "Advice", "author": "Christopher Columbus"
  },
  {
    "content": "I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", "category": "Advice", "author": "Maya Angelou"
  },
  {
    "content": "Whether you think you can or you think you can’t, you’re right.", "category": "Advice", "author": "Henry Ford"
  },
  {
    "content": "Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it.", "category": "Quote", "author": "Johann Wolfgang von Goethe"
  },
  {
    "content": "The best revenge is massive success.", "category": "Quote", "author": "Frank Sinatra"
  },
  {
    "content": "People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily.", "category": "Quote", "author": "Zig Ziglar"
  },
  {
    "content": "Life shrinks or expands in proportion to one’s courage.", "category": "Maxim", "author": "Anais Nin"
  },
  {
    "content": "If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced.", "category": "Quote", "author": "Vincent Van Gogh"
  },
  {
    "content": "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.", "category": "Maxim", "author": "Jesus"
  },
  {
    "content": "The only person you are destined to become is the person you decide to be.", "category": "Advice", "author": "Ralph Waldo Emerson"
  },
  {
    "content": "Go confidently in the direction of your dreams.  Live the life you have imagined.", "category": "Advice", "author": "Henry David Thoreau"
  },
  {
    "content": "When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me.", "category": "Quote", "author": "Erma Bombeck"
  },
  {
    "content": "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.", "category": "Advice", "author": "Booker T. Washington"
  },
  {
    "content": "Certain things catch your eye, but pursue only those that capture the heart.", "category": "Advice", "author": "Ancient Indian Proverb"
  },
  {
    "content": "Believe you can and you’re halfway there.", "category": "Advice", "author": "Theodore Roosevelt"
  },
  {
    "content": "Everything you’ve ever wanted is on the other side of fear.", "category": "Advice", "author": "George Addair"
  },
  {
    "content": "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.", "category": "Quote", "author": "Plato"
  },
  {
    "content": "Teach thy tongue to say, “I do not know,” and thous shalt progress.", "category": "Advice", "author": "Maimonides"
  },
  {
    "content": "Fall seven times and stand up eight.", "category": "Advice", "author": "Japanese Proverb"
  },
  {
    "content": "When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.", "category": "Quote", "author": "Helen Keller"
  },
  {
    "content": "Everything has beauty, but not everyone can see.", "category": "Quote", "author": "Confucius"
  },
  {
    "content": "How wonderful it is that nobody need wait a single moment before starting to improve the world.", "category": "Quote", "author": "Anne Frank"
  },
  {
    "content": "When I let go of what I am, I become what I might be.", "category": "Maxim", "author": "Lao Tzu"
  },
  {
    "content": "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", "category": "Quote", "author": "Maya Angelou"
  },
  {
    "content": "Happiness is not something readymade.  It comes from your own actions.", "category": "Maxim", "author": "Dalai Lama"
  },
  {
    "content": "If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.", "category": "Advice", "author": "Sheryl Sandberg"
  },
  {
    "content": "First, have a definite, clear practical Ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.", "category": "Advice", "author": "Aristotle"
  },
  {
    "content": "If the wind will not serve, take to the oars.", "category": "Maxim", "author": "Latin Proverb"
  },
  {
    "content": "You can’t fall if you don’t climb.  But there’s no joy in living your whole life on the ground.", "category": "Advice", "author": "Unknown"
  },
  {
    "content": "Too many of us are not living our dreams because we are living our fears.", "category": "Quote", "author": "Les Brown"
  },
  {
    "content": "Challenges are what make life interesting and overcoming them is what makes life meaningful.", "category": "Advice", "author": "Joshua J. Marine"
  },
  {
    "content": "If you want to lift yourself up, lift up someone else.", "category": "Maxim", "author": "Booker T. Washington"
  },
  {
    "content": "I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.", "category": "Maxim", "author": "Leonardo da Vinci"
  },
  {
    "content": "Limitations live only in our minds.  But if we use our imaginations, our possibilities become limitless.", "category": "Advice", "author": "Jamie Paolinetti"
  },
  {
    "content": "What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.", "category": "Quote", "author": "Bob Dylan"
  },
  {
    "content": "A person who never made a mistake never tried anything new.", "category": "Quote", "author": "Albert Einstein"
  },
  {
    "content": "The person who says it cannot be done should not interrupt the person who is doing it.", "category": "Advice", "author": "Chinese Proverb"
  },
  {
    "content": "There are no traffic jams along the extra mile.", "category": "Quote", "author": "Roger Staubach"
  },
  {
    "content": "It is never too late to be what you might have been.", "category": "Advice", "author": "George Eliot"
  },
  {
    "content": "I would rather die of passion than of boredom.", "category": "Quote", "author": "Vincent van Gogh"
  },
  {
    "content": "Build your own dreams, or someone else will hire you to build theirs.", "category": "Advice", "author": "Farrah Gray"
  },
  {
    "content": "The battles that count aren’t the ones for gold medals. The struggles within yourself–the invisible battles inside all of us–that’s where it’s at.", "category": "Quote", "author": "Jesse Owens"
  },
  {
    "content": "Education costs money.  But then so does ignorance.", "category": "Quote", "author": "Sir Claus Moser"
  },
  {
    "content": "I have learned over the years that when one’s mind is made up, this diminishes fear.", "category": "Advice", "author": "Rosa Parks"
  },
  {
    "content": "It does not matter how slowly you go as long as you do not stop.", "category": "Advice", "author": "Confucius"
  },
  {
    "content": "If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough.", "category": "Maxim", "author": "Oprah Winfrey"
  },
  {
    "content": "Remember that not getting what you want is sometimes a wonderful stroke of luck.", "category": "Quote", "author": "Dalai Lama"
  },
  {
    "content": "You can’t use up creativity.  The more you use, the more you have.", "category": "Quote", "author": "Maya Angelou"
  },
  {
    "content": "Dream big and dare to fail.", "category": "Advice", "author": "Norman Vaughan"
  },
  {
    "content": "Our lives begin to end the day we become silent about things that matter.", "category": "Quote", "author": "Martin Luther King Jr."
  },
  {
    "content": "Do what you can, where you are, with what you have.", "category": "Advice", "author": "Teddy Roosevelt"
  },
  {
    "content": "If you do what you’ve always done, you’ll get what you’ve always gotten.", "category": "Maxim", "author": "Tony Robbins"
  },
  {
    "content": "Dreaming, after all, is a form of planning.", "category": "Quote", "author": "Gloria Steinem"
  },
  {
    "content": "It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live.", "category": "Quote", "author": "Mae Jemison"
  },
  {
    "content": "You may be disappointed if you fail, but you are doomed if you don’t try.", "category": "Quote", "author": "Beverly Sills"
  },
  {
    "content": "Remember no one can make you feel inferior without your consent.", "category": "Advice", "author": "Eleanor Roosevelt"
  },
  {
    "content": "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.", "category": "Advice", "author": "Henry Ford"
  },
  {
    "content": "It’s not the years in your life that count. It’s the life in your years.", "category": "Quote", "author": "Abraham Lincoln"
  },
  {
    "content": "Change your thoughts and you change your world.", "category": "Quote", "author": "Norman Vincent Peale"
  },
  {
    "content": "Either write something worth reading or do something worth writing.", "category": "Advice", "author": "Benjamin Franklin"
  },
  {
    "content": "The only way to do great work is to love what you do.", "quote": "Advice", "author": "Steve Jobs"
  },
  {
    "content": "Human reason has this peculiar fate that in one species of its knowledge it is burdened by questions which, as prescribed by the very nature of reason itself, it is not able to ignore, but which, as transcending all its powers, it is also not able to answer.", 
    "category": "Philosophy", 
    "author": "Immanuel Kant", 
    "source": "Critique of Pure Reason", 
    "reference": "Preface, A vii",
    "tags": ["reason", "humanity", "questions"]
  },
  {
    "content": "Only the descent into the hell of self-knowledge can pave the way to godliness.", 
    "category": "Philosophy", 
    "author": "Immanuel Kant",
    "source": "Metaphysics of Morals",
    "reference": "Ak 6:441",
    "tags": ["self-knowledge", "godliness"]
  },
  {
    "content": "We speak not strictly and philosophically when we talk of the combat of passion and of reason. Reason is, and ought only to be the slave of the passions, and can never pretend to any other office than to serve and obey them.",
    "category": "Philosophy",
    "author": "David Hume",
    "source": "A Treatise of Human Nature",
    "reference": "Book 2, Part 3, Section 2",
    "tags": ["passion", "reason"]
  },
  {
    "content": "He is happy, whose circumstances suit his temper; but he is more excellent, who can suit his temper to any circumstances.", 
    "category": "Philosophy",
    "author": "David Hume",
    "source": "An Enquiry Concerning the Principles of Morals",
    "reference": "S6.9: Of Qualities Useful to Ourselves, Pt. 1",
    "tags": ["happiness", "temper"]
  }
  , {
    "content": "One will rarely err if extreme actions be ascribed to vanity, ordinary actions to habit, and mean actions to fear.", 
    "category": "Philosophy", 
    "author": "Friedrich Nietzsche",
    "source": "Human, All Too Human",
    "reference": "I.74",
    "tags": ["vanity", "habit", "fear"]
  },
  {
    "content": "In the golden rule of Jesus of Nazareth, we read the complete spirit of the ethics of utility. To do as one would be done by, and to love one's neighbour as oneself, constitute the ideal perfection of utilitarian morality.", 
    "category": "Philosophy", 
    "author": "John Stuart Mill",
    "source": "Utilitarianism",
    "reference": "Chapter 2",
    "tags": ["ethics", "morality", "utilitarianism", "Jesus", "utility", "love", "neighbour"]
  },
  {
    "content": "All power tends to corrupt, and absolute power corrupts absolutely.",
    "category": "Politics",
    "author": "Lord Acton",
    "source": "Essays on Freedom and Powe",
    "reference": "Letter to Mandell Creighton, April 1887",
    "tags": ["power"]
  },
  {
    "content": "Man is by nature a political animal.",
    "category": "Politics",
    "author": "Aristotle",
    "source": "Politics",
    "reference": "Chapter 2",
    "tags": ["political", "man"]
  },
  {
    "content": "In politics, you have your word and your friends- go back on either and you're dead.",
    "category": "Politics",
    "author": "Morton C. Blackwell",
    "source": "Laws of Politics",
    "reference": "",
    "tags": ["friends", "oath", "word"]
  },
  {
    "content": "Finality is not the language of politics.",
    "category": "Politics",
    "author": "Benjamin Disraeli",
    "source": "Speech",
    "reference": "House of Commons, 28 February 1859",
    "tags": ["finality"]
  },
  {
    "content": "Man's capacity for justice makes democracy possible, but man's inclination to injustice makes democracy necessary.",
    "category": "Politics",
    "author": "Reinhold Niebuhr",
    "source": "The Children of Light and the Children of Darkness",
    "reference": " ",
    "tags": ["democracy", "justice", "injustice"]
  },
  {
    "content": "Ankh-Morpork had dallied with many forms of government and had ended up with that form of democracy known as One Man, One Vote. The Patrician was the Man; he had the Vote.",
    "category": "Politics",
    "author": "Terry Pratchett",
    "source": "Mort",
    "reference": " ",
    "tags": ["democracy", "Patrician", "despot"]
  },
  {
    "content": "Politics is the art of postponing decisions until they are no longer relevant.",
    "category": "Politics",
    "author": "Henri Queuille",
    "source": "The Bureaucrat",
    "reference": " ",
    "tags": []
  },
  {
    "content": "Campaign promises are—by long democratic tradition—the least binding form of human commitment.",
    "category": "Politics",
    "author": "Antonin Scalia",
    "source": "Court Judgment",
    "reference": "Republican Party v. White, 536 U.S. 765 ",
    "tags": ["campaign", "campaign promises"]
  },
  {
    "content": "Happy families are all alike; every unhappy family is unhappy in its own way.",
    "category": "Opening Lines",
    "author": "Leo Tolstoy",
    "source": "Anna Karenina",
    "reference": " ",
    "tags": []
  },
  {
    "content": "It was about eleven o'clock in the morning, mid October, with the sun not shining and a look of hard wet rain in the clearness of the foothills.",
    "category": "Opening Lines",
    "author": "Raymond Chandler",
    "source": "The Big Sleep",
    "reference": " ",
    "tags": []
  },
  {
    "content": "The building was on fire, and it wasn't my fault.",
    "category": "Opening Lines",
    "author": "Jim Butcher",
    "source": "Blood Rites",
    "reference": " ",
    "tags": []
  },
  {
    "content": "This is a tale of a meeting of two lonesome, skinny, fairly old white men on a planet which was dying fast.",
    "category": "Opening Lines",
    "author": "Kurt Vonnegut",
    "source": "Breakfast of Champions",
    "reference": " ",
    "tags": []
  },
  {
    "content": "Dr. Iannis had enjoyed a satisfactory day in which none of his patients had died or got any worse.",
    "category": "Opening Lines",
    "author": "Louis de Bernieres",
    "source": "Captain Corelli's Mandolin",
    "reference": " ",
    "tags": []
  },
  {
    "content": "It was love at first sight. The first time Yossarian saw the chaplain he fell madly in love with him.",
    "category": "Opening Lines",
    "author": "Joseph Heller",
    "source": "Catch-22",
    "reference": " ",
    "tags": []
  },
  {
    "content": "If you really want to hear about it, the first thing you'll probably want to know is where I was born, and what my lousy childhood was like, and how my parents were occupied and all before they had me, and all that David Copperfield kind of crap, but I don't feel like going into it, if you want to know the truth.",
    "category": "Opening Lines",
    "author": "J.D. Sallinger",
    "source": "The Catcher in the Rye",
    "reference": " ",
    "tags": []
  },
  {
    "content": "Marley was dead, to begin with. There is no doubt whatever about that.",
    "category": "Opening Lines",
    "author": "Charles Dickens",
    "source": "A Christmas Carol",
    "reference": " ",
    "tags": []
  },
  {
    "content": "When a day that you happen to know is Wednesday starts off by sounding like Sunday, there is something seriously wrong somewhere.",
    "category": "Opening Lines",
    "author": "John Wyndham",
    "source": "The Day of the Triffids",
    "reference": " ",
    "tags": []
  },
  {
    "content": "Anything that was in the world when you were born is normal and natural. Anything invented between when you were 15 and 35 is new and revolutionary and exciting, and you’ll probably get a career in it. Anything invented after you’re 35 is against the natural order of things.",
    "category": "Technology",
    "author": "Douglas Adams",
    "source": "The Salmon of Doubt: Hitchhiking the Galaxy One Last Time",
    "reference": " ",
    "tags": []
  },
  {
    "content": "Science and technology multiply around us. To an increasing extent they dictate the languages in which we speak and think. Either we use those languages, or we remain mute.",
    "category": "Technology",
    "author": "J. G. Ballard",
    "source": "Crash",
    "reference": "Introduction to the 1984 French edition",
    "tags": []
  },
  {
    "content": "Engineering or Technology is the making of things that did not previously exist, whereas science is the discovering of things that have long existed.",
    "category": "Technology",
    "author": "David Billington",
    "source": "The Tower and the Bridge: The New Art of Structural Engineering",
    "reference": " ",
    "tags": []
  },
  {
    "content": "The most important and urgent problems of the technology of today are no longer the satisfactions of the primary needs or of archetypal wishes, but the reparation of the evils and damages by the technology of yesterday.",
    "category": "Technology",
    "author": "Dennis Gabor",
    "source": "Innovations: Scientific, Technological and Social",
    "reference": " ",
    "tags": []
  },
  {
    "content": "We live in a society exquisitely dependent on science and technology, in which hardly anyone knows anything about science and technology. ",
    "category": "Technology",
    "author": "Carl Sagan",
    "source": "Why We Need To Understand Science",
    "reference": "The Skeptical Inquirer Vol. 14, Issue 3, (Spring 1990)",
    "tags": []
  },
  {
    "content": "We are too prone to make technological instruments the scapegoats for the sins of those who wield them. The products of modern science are not in themselves good or bad; it is the way they are used that determines their value.",
    "category": "Technology",
    "author": "David Sarnoff",
    "source": "Speech",
    "reference": "Recorded in Understanding Media: the Extensions of Man? (2nd Ed.,1964)",
    "tags": []
  },
  {
    "content": "Technology is an inherent democratizer. Because of the evolution of hardware and software, you’re able to scale up almost anything you can think up. … We’ll have to see if in our lifetime that means that everybody has more or less tools that are of equal power.",
    "category": "Technology",
    "author": "Sergey Brin",
    "source": "Speech",
    "reference": "UC Berkeley, 'Search Engines, Technology, and Business (3 Oct 2005)",
    "tags": []
  }
]

entries.forEach(entry =>
    Entry.createOrUpdate(entry)
  )