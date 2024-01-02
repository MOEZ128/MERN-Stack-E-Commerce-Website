    // client/src/app/core/models/report.model.ts
    import { User } from './user.model';
    import { Comment } from './comment.model';

    export class Report {
        constructor(
          public _id: string,
          public reporterId: string,
          public reportedUserId: string,
          public comment: Comment,
          public reason: string[],
          public creationDate?: Date
        ) { }
      }