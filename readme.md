## The Very Important Thomas Friedman Column Generator

Link to use ===>

###### Version 1.0

Designed and developed by Timothy Malstead
timmalstead@gmail.com

Last week’s events in [country] were truly historic, although we may not know for [unit of time] or even [larger unit of time] what their final meaning is. What’s important, however, is that we focus on what [noun] means to the average [noun]. Even if the [adjective] media seems too caught up in [verb]ing the overall situation to pay attention to the important effects on daily life. After all, everyone knows [world leader/celebrity/obscure historical figure] never [verb]s on a [day of the week]

While it's [true/false] that the recent [verb] in [country] was decidedly [adjective], it’s important to remember three things: One, people don’t behave like [noun], so attempts to treat them as such inevitably look foolish. [noun]s never suddenly [unlikely scenario]. Two, [country] has spent decades being[past tense verb], so a mindset of [noun] and [noun] will seem foreign and strange. And three, [abstract concept] is an extraordinarily powerful idea.

When I was in [country in question] last [unit of time], I was amazed by the people’s innate [adjective]. This tells me two things. It tells me that the citizens of [country in question] have no shortage of [verb], and that is a good beginning to grow from. Second, it tells me that people in [country in question] are just like people anywhere else on this great [noun] of ours.

So what should we do about the chaos in [country in question]? Well, it’s easier to start with what we should not do. We should not under any circumstances [verb]. Beyond that, we need to be careful to nurture the seeds of [abstract concept]. The opportunity is there, but I worry that the path to [noun] is so [adjective] that [country in question] will have to move down it very slowly, prudently and moderately.

Speaking with a [member of a blue collar occupation] on the last day of my recent visit, I asked him if there was any message that he wanted me to carry back home with me to the Land of the Free. He pondered for a second, and then smiled and said, “[inspirational quote of the type you might see on pintrest]”. Upon reflection, I think he may have a point.

I don’t know what [country in question] will be like a few years from now, but I do know that it will probably be [adjective], even if it [adjective]. I know this because, through all the [verb], the people still haven’t lost sight of their [noun].

so the variables would be 

country, unitOfTime, secondUnitOfTime, noun, secondNoun, adjective, verb, properName, secondVerb, boolean, thirdVerb, secondAdjective, thirdNoun, fourthNoun, scenario, pastVerb, fifthNoun, sixthNoun, concept, thirdAdjective, fourthVerb, seventhNoun, fifthVerb, eighthNoun, fourthAdjective, blueCollar, quote, fifthAdjective, finalAdjective, finalVerb, finalNoun

stored as 

const madlibs = new mongoose.Schema({
    country : String,
    times : [String],
    nouns : [String],
    adjectives : [String],
    verbs : [String],
    trueFalse : boolean,
    scenario : String,
    concept : String,
    blueCollarOccupation : String,
    quote : String
})