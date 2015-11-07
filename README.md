# papu force adapter
This is a salesforce data adapter for Ember.js utilising the salesforce soap api and is supported with tooling which automatically creates the needed ember models from the sobject schema.

Supports:
Custom, Standard and Platform objects

Has weak support for:
- Multi-typed references (Attachment.ParentId -> [Post__c, Author__c] for example)
  * A multi-typed reference becomes a string field and the parent relationship is dropped in ember

The adapter has been tested with:
 - jQuery version 1.11.3
 - Ember version 1.11.1
 - Ember data version 1.13.4

To setup examples and a guide of how to use the adapter go to:
https://github.com/bvellacott/fa-examples

