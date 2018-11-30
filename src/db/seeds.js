import { Entry, realm } from '../models/realm'

// Deletes database before seeding!
realm.write(() => {
  realm.deleteAll()
})

const quotes = [
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
    "content": "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.", 
    "category": "Quote",
     "author": "Robert Frost",
    "tags": ["roads"]
  },
  {
    "content": "I attribute my success to this: I never gave or took any excuse.", 
    "category": "Quote", 
    "author": "Florence Nightingale",
    "tags": ["success", "excuse"]
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
    "content": "Every strike brings me closer to the next home run.", "category": "Quote",
    "author": "Babe Ruth",
    "tags": ["strike", "progress"]
  },
  {
    "content": "Definiteness of purpose is the starting point of all achievement.",
    "category": "Maxim",
    "author": "W. Clement Stone",
    "tags": ["purpose", "achievement"]
  },
  {
    "content": "We must balance conspicuous consumption with conscious capitalism.",
    "category": "Quote", 
    "author": "Kevin Kruse",
    "tags": ["capitalism", "conscious"]
  },
  {
    "content": "Life is what happens to you while you’re busy making other plans.", 
    "category": "Quote", 
    "author": "John Lennon",
    "tags": ["life", "plans"]
  },
  {
    "content": "We become what we think about.",
    "category": "Advice", 
    "author": "Earl Nightingale",
    "tags": ["personality", "growth"]
  },
  {
    "content": "Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover.", 
    "category": "Advice", 
    "author": "Mark Twain",
    "tags": ["explore", "dream", "discover"]
  },
  {
    "content": "Life is 10% what happens to me and 90% of how I react to it.", "category": "Quote",
    "author": "Charles Swindoll",
    "tags": ["life", "reaction"]
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
    "content": "Either you run the day, or the day runs you.", "category": "Advice", "author": "Jim Rohn"
  },
  {
    "content": "Whether you think you can or you think you can’t, you’re right.", "category": "Advice", "author": "Henry Ford"
  },
  {
    "content": "The two most important days in your life are the day you are born and the day you find out why.", "category": "Quote", "author": "Mark Twain"
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
    "content": "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.", "category": "Quote", "author": "Aristotle"
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
    "content": "Start where you are. Use what you have.  Do what you can.", "category": "Advice", "author": "Arthur Ashe"
  },
  {
    "content": "When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy’.  They told me I didn’t understand the assignment, and I told them they didn’t understand life.", "category": "Quote", "author": "John Lennon"
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
    "content": "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.", "category": "Quote", "author": "Marie Curie"
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
    "content": "You take your life in your own hands, and what happens? A terrible thing, no one to blame.", "category": "Quote", "author": "Erica Jong"
  },
  {
    "content": "What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.", "category": "Quote", "author": "Bob Dylan"
  },
  {
    "content": "I didn’t fail the test. I just found 100 ways to do it wrong.", "category": "Quote", "author": "Benjamin Franklin"
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
    "content": "You become what you believe.", "category": "Advice", "author": "Oprah Winfrey"
  },
  {
    "content": "I would rather die of passion than of boredom.", "category": "Quote", "author": "Vincent van Gogh"
  },
  {
    "content": "A truly rich man is one whose children run into his arms when his hands are empty.", "category": "Quote", "author": "Unknown"
  },
  {
    "content": "It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings.", "category": "Advice", "author": "Ann Landers"
  },
  {
    "content": "If you want your children to turn out well, spend twice as much time with them, and half as much money.", "category": "Advice", "author": "Abigail Van Buren"
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
    "content": "Life is what we make it, always has been, always will be.", "category": "Advice", "author": "Grandma Moses"
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
    "content": "Nothing is impossible, the word itself says, “I’m possible!", "category": "Quote", "author": "Audrey Hepburn"
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
  }
]

quotes.forEach(Quote =>
    Entry.createOrUpdate(Quote)
  )