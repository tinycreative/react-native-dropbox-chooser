//
//  RNDropboxChooser.m
//  RNDropboxChooser
//
//  Created by Asa Miller on 11/12/15.
//  Copyright © 2015 Asa Miller. All rights reserved.
//

#import "RNDropboxChooser.h"
#import "RCTBridge.h"
#import "RCTUtils.h"
#import <DBChooser/DBChooser.h>

@implementation DropboxChooser

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(openChooser:(NSString*)linkType callback:(RCTResponseSenderBlock)callback)
{
  
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *controller = [[[[UIApplication sharedApplication] windows] firstObject] rootViewController];
    
    DBChooserLinkType DBlinkType = [linkType isEqualToString:@"DBChooserLinkTypeDirect"] ? DBChooserLinkTypeDirect : DBChooserLinkTypePreview;
    
    [[DBChooser defaultChooser] openChooserForLinkType:DBlinkType
                                    fromViewController:controller completion:^(NSArray *results)
     {
       if ([results count]) {
         // Process results from Chooser
         callback(@[[NSNull null], results]);
       } else {
         // User canceled the action
         callback(@[RCTMakeError(@"Canceled", nil, nil)]);
       }
     }];
  });
  
  
}

@end
