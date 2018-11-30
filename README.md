# Commonplace Book

## What?
A robust, searchable digital repository for the ideas, quotes and maxims that strike you as you go about your life, wherever they come from.

Quickly capture, categorise, and tag passages from books, articles, essays, or your own imagination.

Search your commonplace book by category, tags, author, source, and/or date, to find the perfect entry to inspire an essay, speech, article, or your personal philosophy.

Build a reference of ideas that matter most to you - captured in a way that makes sense to you.

##
## Why?
We consume more information than ever, but so much of it immediately slips through our fingertips and out of our minds.

Capturing and cataloguing ideas that strike you at a moment in time will make it more likely that you can hold on to and refer back to those ideas in the future - whether for your own reflection when facing particular challenges or opportunities, or to weave into your writing and speaking.

The act of reflecting on which ideas are important to you and what they are about helps you to connect ideas and develop your thinking.

Many digital solutions for capturing notes exist (e.g. Evernote, Day One, OneNote), but they lack detailed cataloguing and searching power, tending to be limited to tags and broad text searches.

The Commonplace Book app will be tailored specifically to easily capturing and comprehensively searching entries, with a user interface and presentation designed to exactly match its purpose of storing and recalling ideas and who and where they came from.

- greater cataloguing and searching power, including by category, tags, author, source, date
- focused user interface for search and displaying entries
- frictionless capturing of notes, including photo-to-text and voice-to-text features

##
## How?
#### An offline-first mobile application built in React Native, first for Android, then for iOS ####

Comes with example categories and tags, but fully customisable to allow users to structure and search entries in a way which makes most sense to them.

##
## Data Models
### Entry
- **Content**  (*required*)
- **Author** (*required*)
- **Category** (Quote, Idea, Maxim, Definition)  (*required*, default *quote*)
- **Fictional?** (true/false) (*required*, default *false*)
  - Character (*input available if 'fictional' is true*)
- **Tags** (e.g. politics, philosophy, motivation, leadership, rationality, religion, film, journalism)
- **Source** (e.g. The Bible)
- **Reference** (e.g. page 56)
- **Date**
- **Date** created (automatic, user cannot edit)
- **id** (automatic, user cannot edit)

*Additional models with name and id only for Author, Category, Character, Tag, Tag-Entry (join), and Source will be used if a relational database solution is used for local persistence.*

##
## MVP
- Add entry
- View single entry
- Edit entry
- Delete entry
- Display multiple entries
- Basic text search
- Advanced search
- Home page with random quote
- Local persistence (e.g. SQLite)

##
## MVP Components
- **Top Menu:** (logo and buttons for add entry, home, *settings in later version*) - always on top of app
- **Simple Search Bar:** (text input, search button, and toggle to switch to advanced search view) - usually on bottom of app
- **Advanced Search Form:** form with inputs and selections for advanced search
- **Entry of the Day:** presentational card displaying quote content, tags, and author
- **Home Page:** entry of the day card with 'browse' dropdowns to select category, author, tag
- **Search Results:** Container to show cards for search results. Scrolls horizontally
- **Search Result Card:** small presentational card showing first x characters of entry content, and small badge with author. 
- **View entry:** Page showing full details of entry
- **Add entry:** form to add entry
- **Edit entry:** form to edit entry (based on form entry page, possibly same component)

##
## Timeline
**Wednesday 21 Nov** - proposal presentation, finish wireframing, React Native basic set up and learning (for Android)

**By close Fri 23 Nov** - Home page, view single entry, view multiple, basic search, local storage solution implemented

**By close Tue 27 Nov** - Add entry, edit entry, delete entry, advanced search

