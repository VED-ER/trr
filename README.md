NOTES:

- Focus of this project was on implementing google ml for text recognition from an image
- The goal was to write a custom native module that does the recognition on device (rather than sending an image to cloud for processing)
- The app works by using a camera and taking an image and then reading text from it, or picking an image from file system and then reading it
- Small touches are missing (e.g loading state), again main focus was on google ml and native module, if I missed anything its probably on purpose
- This project contains native code, you need to build the app first
- The best way is to open the project in xcode, build it there and test on real device (to use camera and file system)
- As I didn't have android device nor time, this project is on ios only (android native module is missing purposely, left for discussion)
