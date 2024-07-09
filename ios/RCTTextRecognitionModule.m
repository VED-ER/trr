//
//  TextRecognitionModule.m
//  ml
//
//  Created by Vedran Erak on 9. 7. 2024..
//

// RCTCalendarModule.m
#import "RCTTextRecognitionModule.h"
#import <React/RCTLog.h>

@import MLKit;

@implementation RCTTextRecognitionModule

RCT_EXPORT_MODULE(TextRecognitionModule);

- (NSMutableDictionary *)getFrameDictionary:(CGRect)frame {
  NSMutableDictionary *rect = [NSMutableDictionary dictionary];
  
  [rect setValue:[NSNumber numberWithFloat:frame.origin.x] forKey:@"left"];
  [rect setValue:[NSNumber numberWithFloat:frame.origin.y] forKey:@"top"];
  [rect setValue:[NSNumber numberWithFloat:frame.size.width] forKey:@"width"];
  [rect setValue:[NSNumber numberWithFloat:frame.size.height] forKey:@"height"];
  
  return rect;
}

RCT_EXPORT_METHOD(recognizeImage:(NSString *)url
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  
  RCTLogInfo(@"URL: %@", url);
  NSURL *_url = [NSURL URLWithString:url];
  NSData *imageData = [NSData dataWithContentsOfURL:_url];
  UIImage *image = [UIImage imageWithData:imageData];

  MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:image];
  
  MLKTextRecognizer *textRecognizer = [MLKTextRecognizer textRecognizer];
  
  [textRecognizer processImage:visionImage
                    completion:^(MLKText *_Nullable result,
                                 NSError *_Nullable error) {
    if (error != nil || result == nil) {
      // Error handling
      reject(@"text_recognition", @"text recognition is failed", nil);
      return;
    }
    
    resolve(result.text);
  }];

}

@end
