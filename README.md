# odin-tic-tac-toe
Odin Project assignment to make tic-tac-toe using what I've learned about factory functions and the module pattern.

https://robotkio.github.io/odin-tic-tac-toe/

It doesn't currently:
- keep score
- announce winner
- display winning set

But I'm feeling pretty comfortabale with where it's at. I think I can move on or look at other peoples versions, now.

General thoughts:
- I think I went a little overboard in scope without having the experience to back it up so this took a lot longer than I would have liked.
- That said, I'm still happy with what I have and, because I did have things in smaller functions, changes as I went along became surprisingly straightforward.
- I can't help but think I managed this in a way that's more complicated than is necessary.
- I really only encapsulated the core game functions away from the display functions. The display functions still feel like they're probably too coupled. Heck, the core game rules may be too coupled. It just seemed like the rules were so small I didn't need, say, something like a whole object for a player. That may have changed if I was going to keep score.
- I regret using svg's grabbed from https://pictogrammers.com/library/mdi/. It's not that they're not cool, and I probably could have just used them as images and saved myself time, I just like the idea of it rendering on the page. It also seems a lot easier to manipulate with CSS in that I can, say, set its colour with the "fill" attribute rather than modifying it with a CSS filter.
- I vaguely planned the whole thing with the intent that I could have more than one game of tic-tac-toe going on. If you give t3Displayer the ID of another containing element the intent was that it would only query elements from within its own containers ID. Each displayer instance will also have its own, internal, tic-tac-toe game instance. I have no idea if that works, I have lost almost all interest in trying to make that a reality.
- I'm very much looking forward to seeing what other people have done.

Lessons learned from others:

- A 2D array would have been fine.
- My code is not at all great. My code is also really not that bad.
- I want AI trained on TOP students code.
- Rather than re-drawing the whole board after each move I should probably have added and removed player marks from the cells.
- Someone used "const getBoard = () => [...board];" and I want to know what an elipsis does.
- I'm getting too tired to look at more, it's past midnight.