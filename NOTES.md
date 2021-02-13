# Review notes

These are just some feedback items that I see for the project. Thank you for
giving me the chance to review it.

## The experience on Heroku

It's a very fancy home page with the scrolling and the different background
images. Nicely found and nicely done. Your image carousel is fully functional
and contains nice images.

The channels seem to work flawlessly. That's a real credit to all of you. Well
done. I like that I seem to be able to rename the channels that I created but
not the ones that I didn't.

I was pleasantly amused by my avatar. Full-moon-face-person is sometimes how I
feel. I could really _identify_ with it.

Emoji-view, while mostly illegible to me, works like a _charm_!

Sign-up, logging out, and logging in work with no problem. The fact that I can't
sign up more than once for an account with the same email address is all kinds
of right for data validation.

I really dig the C-logos, by the way.

OMG. Did I mention the audio, yet? I haven't? I <3 the audio! Good work! It adds
a whole new dimension to my interactions.

I would recommend hiding the stuff that you didn't get to. This will tighten
your presentation and not leave test users asking questions.

## Source files

Here is some stuff about the source files.

### README.md

This is really spot-on. That's for the concise set of active links.

### package.json

A couple of things, here, mainly bookkeeping.

The dependencies that you use in your project seem to only be **express** and
**socket.io**. You still have a lot of dependencies from (what I'm guessing)
when this also included the back-end stuff. Cleaning up the dependencies (and
devDependencies) is just something I'd do before showcasing it to the wider
world. It is an attention-to-detail kind of thing.

Your "start" script uses nodemon. You should really only use nodemon in
development situations. This means that when Heroku runs your app, it is using
nodemon. The best thing to do, here, is to split up those into two separate
commands, one for you to use during development, and one for Heroku (and others)
to use to emulate production.

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
},
```

### Routes

Until you need them, don't create them. The `/general` and `/help-requests`
routes exist in the handler and there are templates for them, but they don't
seem to do anything. I don't see those in the Feature List, either. I'm sure
they were stretch goals. But, if there's nothing functional there, I'd recommend
removing them for a couple of reasons:

1. Other coders that come to look at the source will ask why they're there. They
   can be pretty harsh critics.
2. Dead code, or unused code, if it ever goes into production (like it is, now),
   can become terrifyingly difficult to remove. Best to do it early, if
   possible.

### Pug templates

Overall, I understood each when I opened it. They seem small enough and
maintainable enough to really help with long-term viability of a product such as
this.

Before showcasing this, there is some clean-up that I would recommend:

* **Standardize the indentations**: In some of your files, you have blocks in
  one place that are indented four spaces. In other places in the same file,
  they are indented two. Pug is forgiving. Humans aren't. An easy way to fix
  this is to install an extension like [Pug beautify] and just run _beautify_
  on all of the Pug templates. That'll make sure they're all consistent within
  themselves and one another.
* **Make sure you have proper block content**: I noticed that in **layout.pug**,
  you have `body` followed by `block content`. That's probably as it should be,
  since in most of your Pug files, you are just adding elements to the body. In
  **main.pug**, though, your `block content` starts off with a `body` tag. That
  means there are two `body` elements in the HTML sent back to the browser.

In **layout.pug**, you import your CSS files. Don't let anyone fool you into
adding `type="text/css"` onto those `link` tags. The browser _doesn't care_
that you add a `type` attribute to the `link` tag. It all but ignores it. Just
remove them.

### JavaScript files

I opened **channel.js** and initially thought, "Whoa, this is one dense file."
Then, I started reading it. The helpful comments along the way combined with the
clear naming scheme of variables eased a lot of the worry that I had that this
was going to be something hard to understand. _Really good job_.

I particularly like this code. I hadn't expected it, but it makes ALL the sense
in the world.

```js
if (Number(userId) === 1) {
  alert("Sorry! You cannot change the name as Demo User....");
}
```

Some of the JavaScript has semicolons in all the right places. Other files, it's
more like 60% semicolons, the other 40% just aren't there. Obviously everything
still runs because JavaScript is a forgiving language. I'd just say that it's
best to _be consistent_.

The number of times that I see `localStorage.setItem` and `.getItem` makes me
think that refactoring those calls into your **utils.js** might make it easier
across the application.

When I see large blocks of commented out code that starts with something like
"//Old implementation to get messages from database onto screen", I get a little
dismayed as a fellow developer. That's why we have version control with Git.
Just delete that stuff! If you want to go look at it later, go look at the
commit where you deleted it. Or, stick it in a branch that you can go refer to
when you want to.

Little things like this are confusing:

```js
const messagesHTML = Messages.map(
    ({ message, User: { fullName }, createdAt }) => {
        // Neat-o code
    }) // <- Am I missing something?
```

Because the parentheses don't line up with the line that opened them, it feels
like there's something missing here. I'd recommend something like one of these.

```js
const messagesHTML = Messages.map(({ message, User: { fullName }, createdAt }) => {
    // Neat-o code
});

/* or */

const messagesHTML = Messages.map(
    ({ message, User: { fullName }, createdAt }) => {
        // Neat-o code
    }
);
```

That way, it's visually clear where "blocks" begin and end.

In **login.js**, it feels like there's an opportunity to reduce the code in that
file by about 40% if you could extracted a common function and passed in the
emails and passwords to it from the specific click handlers.

This is just me wondering: why did you choose to use `import` for the
**utils.js** module, but do `<script src="...">` to get all of the other scripts
into the page?

So, I can't develop this app locally, it seems. All of the URLs for the fetches
are to the Heroku-hosted service. Being able to develop locally is a _really_
big advantage. If I started this up and started sending silly test messages,
then everyone on Clack! would see them. Being able to send messages to a server
on the localhost when in development would be a very nice feature to have and
something that I would want to add before showcasing beyond the bounds of the
classroom.

[Pug beautify]: https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-pugbeautify
