import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  getAllPosts() {
    return 'This action returns all posts';
  }
}
