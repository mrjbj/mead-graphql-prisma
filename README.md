# mead-graphql-prisma

've really been struggling with this lesson.  I can get the tests working but not without introducing hanging asynchronous operations in jest.  I've been able to isolate the behavior as stemming from the new getClient() program, I think. 

In the example below, if you clone the repository run the code via npm run test (which only includes tests from "post.test.ts" for simplicity) the tests will pass successfully but jest will hang with a pending async warning.  Then, if you cut the code from getClient.ts and replace it with the code from getClient.small.ts (e.g. the original getClient function from earlier in the course), and then npm run test again, the tests will still pass but this time without any hanging async operations. 

I realize it may be a pain to clone repo to help me debug this but would really appreciate it if someone could help point me in right direction.  it seems almost impossible to use jest on anything nontrivial without running into these intractable hanging async warnings.  I'm not sure if this is just the way things are in jest or if it is indicative of some lurking problem in the code, like perhaps not closing subscriptions properly or something.  Anyway, if you could help, I'd really appreciate it.  Thanks.
