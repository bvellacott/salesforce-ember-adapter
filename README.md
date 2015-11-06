# faTests
Tests for the force adapter

Supports:
Custom, Standard and Platform objects

Has weak support for:
- Multi-typed references (Attachment.ParentId -> [Post__c, Author__c] for example)
  * A multi-typed reference becomes a string field and the parent relationship is dropped in ember
