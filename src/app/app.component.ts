import {AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ApiService, Entry} from "./api.service";
import { delay, of, Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  text = localStorage.getItem('content') ?? ''
  results: Array<Entry> = []
  translation: string = ''
  hideAside = false

  @ViewChild("textareaRef", { static: true, read: ViewContainerRef }) textareaRef!: ViewContainerRef
  @ViewChild("aside", { static: true, read: ViewContainerRef }) aside!: ViewContainerRef

  private textarea!: HTMLTextAreaElement
  private sub?: Subscription
  private sub2?: Subscription
  private sub3?: Subscription

  constructor(private api: ApiService, private cr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.textarea = this.textareaRef.element.nativeElement as HTMLTextAreaElement
  }

  dich() {
    const tu = this.textarea.value.substr(
      this.textarea.selectionStart,
      this.textarea.selectionEnd - this.textarea.selectionStart
    ).replace(new RegExp('[()\\[\\]\'\"!.,;:?“”…/]', 'g'), ' ').trim()

    this.translation = ''

    this.sub3?.unsubscribe()

    if (tu) {
      this.sub3 = this.api.translate(tu).subscribe(
        translation => {
          this.translation = translation
          this.cr.detectChanges()
        }
      )
    }

    if (!tu || tu.length > 128) {
      this.results = []
      return
    }

    this.sub?.unsubscribe()
    this.sub = this.api.tu(tu).pipe(
      delay(50)
    ).subscribe({
      next: result => {
        this.results = result
        this.aside.element.nativeElement.scrollTo(0, 0)
        this.cr.detectChanges()
      },
      error: () => {
        this.results = []
      },
      complete: () => {
        this.sub = undefined
      }
    })

    this.sub2?.unsubscribe()
    this.sub2 = of(true).pipe(delay(5000)).subscribe(() => localStorage.setItem('content', this.text))
  }

  pull() {
    const desc = [
      this.results.filter(x => x.definitions?.length).map(x => x.definitions),
      this.results.filter(x => x.examples?.length).map(x => x.examples!.map(ex => `Ví dụ: ${ex}`))
    ].flat(2)

    if (!desc.length) {
      return
    }

    const selection = this.text.substr(
      this.textarea.selectionStart,
      this.textarea.selectionEnd - this.textarea.selectionStart
    )

    this.text = `${selection}\n\n${desc.join('\n\n')}\n\n↵ ↵ ↵\n\n${this.text}`

    setTimeout(() => {
      this.textarea.scrollTo(0, 0)
      this.textarea.selectionStart = 0
      this.textarea.selectionEnd = selection.length
    })
  }
}
