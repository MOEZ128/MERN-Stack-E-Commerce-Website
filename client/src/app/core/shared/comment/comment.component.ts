// Decorators and Lifehooks
import { Component, TemplateRef, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Services
import { CommentService } from '../../services/comment.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report.model';

// Models
import { Comment } from '../../models/comment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('bookId') bookId: string;
  @Input('isLogged') isLogged: boolean;
  @Input('isAdmin') isAdmin: boolean;
  @Input('userId') userId: string;
  commentForm: FormGroup;
  commentModalRef: BsModalRef;
  removeModalRef: BsModalRef;
  comments: Comment[] = [];
  isFromEdit: boolean;
  lastEditId: string;
  lastDeleteId: string;
  action: string;
  reportForm: FormGroup;
  reportModalRef: BsModalRef;
  
  constructor(
    private commentService: CommentService,
    private modalService: BsModalService,
    private reportService: ReportService

  ) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      'content': new FormControl('', Validators.required)
    });

    this.commentService
      .getComments(this.bookId, this.comments.length.toString())
      .subscribe((res) => {
        this.comments = res.data;
      });
      this.reportForm = new FormGroup({
        'reason': new FormArray([
          new FormControl(false), // Langage offensant
          new FormControl(false), // Le harcèlement direct
          new FormControl(false), // Spam
          new FormControl(false), // Médias sensibles
          new FormControl(false)  // Menace pour la vie privée
        ])
    });
       
  }
  openReportModal(template: TemplateRef<any>, commentId: string): void {
    this.lastEditId = commentId;
    this.reportModalRef = this.modalService.show(
      template,
      { class: 'myModal' }
    );
  }
  
  submitReport(): void {
    let reasons = [];
    let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')); // Convert NodeList to array
  
    checkboxes.forEach((checkbox: HTMLInputElement, index) => {
      if (checkbox.checked) {
        switch (index) {
          case 0:
            reasons.push('Langage offensant');
            break;
          case 1:
            reasons.push('Le harcèlement direct');
            break;
          case 2:
            reasons.push('Spam');
            break;
          case 3:
            reasons.push('Médias sensibles');
            break;
          case 4:
            reasons.push('Menace pour la vie privée');
            break;
        }
      }
    });
  
    let commentObj = this.comments.find(c => c._id === this.lastEditId);
    const report: Report = {
      _id: this.lastEditId, 
      reporterId: this.userId, 
      reportedUserId: commentObj.user._id,
      comment: commentObj, 
      reason: reasons
    };
  
    this.reportService.reportComment(this.lastEditId, report).subscribe(() => {
      console.log('Report submitted successfully');
      this.reportModalRef.hide();
      this.reportForm.reset();
    }, error => {
      console.log('Error occurred while submitting report: ', error);
    });
  }
  

      openFormModal(template: TemplateRef<any>, id?: string): void {
    if (id) {
      let content = '';
      this.isFromEdit = true;
      this.lastEditId = id;
      for (const c of this.comments) {
        if (c._id === id) {
          content = c.content;
          break;
        }
      }
      this.action = 'Edit';
      this.commentForm.patchValue({ content: content });
    } else {
      this.action = 'Create';
      this.isFromEdit = false;
      this.commentForm.patchValue({ content: '' });
    }

    this.commentModalRef = this.modalService.show(
      template,
      { class: 'myModal' }
    );
  }

  openRemoveModal(template: TemplateRef<any>, id: string): void {
    this.lastDeleteId = id;
    this.removeModalRef = this.modalService.show(
      template,
      { class: 'myModal modal-sm' }
    );
  }

  onSubmit(): void {
    if (this.isFromEdit) {
      this.modifyComment();
    } else {
      this.createComment();
    }
  }

  loadMoreComments(): void {
    this.commentService
      .getComments(this.bookId, this.comments.length.toString())
      .subscribe((res) => {
        if (res.data.length !== 0) {
          this.comments.splice(this.comments.length, 0, ...res.data);
        }
      });
  }

  createComment(): void {
    this.commentService
      .addComment(this.bookId, this.commentForm.value)
      .subscribe((res) => {
        this.comments.unshift(res.data);
      });

    this.commentForm.reset();
  }

  modifyComment(): void {
    const editedContent = this.commentForm.value.content;
    this.commentService
      .editComment(this.lastEditId, this.commentForm.value)
      .subscribe(() => {
        for (const c of this.comments) {
          if (c._id === this.lastEditId) {
            c.content = editedContent;
            break;
          }
        }
      });

    this.commentForm.reset();
  }

  removeComment(): void {
    this.removeModalRef.hide();
    const delId = this.lastDeleteId;
    this.commentService
      .deleteComment(this.lastDeleteId)
      .subscribe(() => {
        this.comments = this.comments.filter(c => c._id !== delId);
      });
  }

}
