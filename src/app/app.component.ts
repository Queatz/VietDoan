import {AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ApiService, Entry} from "./api.service";
import {delay, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Đoạn Việt'
  text: string = 'Có bác nào ở đây trải nghiệm cảm giác sống với một người chị trong nhà mà cảm giác giống như mình đang sống với người lạ không nhỉ? Tự nhiên đang yên đang lành bắt lúc xuống học lại ở chung (mình là nam), không biết nghĩ sau mà đề nghị vậy cho được.\n' +
    '\n' +
    'Lúc mình nói chuyển vô kí túc xá lại đi vòng vòng nói với bố mẹ rằng vô kí túc xá người ta đánh nhau đồ các thứ. Rồi đầu dịch đã xin tiền mẹ mình đóng tiền trọ, mẹ mình cho gần 9 triệu đồng, xong nay lại xin cô mình tiền đóng tiền trọ (xin thêm gần 10 triệu nữa), mặt hí ha hí hửng, suốt ngày đi lại ca hát rồi đặt hàng online liên tục (hầu như ngày nào cũng có shipper ghé nhà mình giao hàng).\n' +
    '\n' +
    'Đã vậy lúc mình nói gì ra cũng tỏ vẻ hiểu biết, có vấn đề gì thì nói hồi đó có bạn trải qua chuyện đó rồi nè, y chang vậy đó (mà bạn nào thì mình không rõ,cứ mở miệng ra nói là có bạn như vậy rồi). Bình thường nói chuyện với bố mẹ thì kể lể là đi học bị bạn bè chơi xấu, làm thuyết trình chung xong rồi bị nói là không chịu làm, kể là bị thầy cô trù dập nên lớp chỉ có mình mình bị điểm thấp.\n' +
    '\n' +
    'Mình không thể hiểu nổi là tại sao lại có người như vậy luôn? Bình thường cô mình hay cho tiền quà cáp các thứ xong về nhà lại nói xấu cô. Học đại học chuyên ngành tiếng nước khác rồi giờ lại xin tiền bố mẹ cho học tiếp đại học sư phạm Anh. Mình không hiểu nổi là ngay từ đầu nhắm thi sư phạm Anh, mà không đậu học ngành sư phạm tiếng nước khác hết 5 năm, xong giờ lại đòi đi học sư phạm Anh thêm 3 năm nữa?\n' +
    '\n' +
    'Rồi còn đòi học xong sang Anh học thạc sĩ tiếng Anh dù gia đình không khá giả gì? Mà lại thích diễn kịch nữa chứ. Cứ nghe nhà có bố mẹ về là chạy lăng xăng đi học bài này nọ, bình thường thì ngồi lướt điện thoại không tha cho cái điện thoại tí nào. Nhiều khi mình tự hỏi là sao mình lại có một người nhà như thế nhỉ? Mẹ mình lúc nào cũng làm việc cật lực không ngơi nghỉ gì cả. Giờ lại bắt mình ở chung với người như vậy nữa?\n' +
    '\n' +
    '---\n' +
    '\n' +
    'Trong khi Tổng thống Nga Vladimir Putin dường như chỉ có một phiên dịch viên ngồi trong phòng riêng trong suốt hội nghị trực tuyến “1 – 1” với Tổng thống Joe Biden, bức ảnh mà Nhà Trắng công bố lại cho thấy nhà lãnh đạo Mỹ có cả một nhóm ngồi cùng.\n' +
    '\n' +
    'Hôm 7/12, Tổng thống Putin và Tổng thống Biden đã có hơn 2 tiếng đồng hồ đối thoại trực tuyến. Nội dung họp bàn gồm vấn đề Ukraine, lệnh trừng phạt, vũ khí hạt nhân và nhiều chủ đề khác.\n' +
    '\n' +
    'Sau màn giới thiệu được phát trực tiếp trên truyền hình, các nhà báo được mời ra ngoài và hai nhà lãnh đạo Nga – Mỹ tiếp tục phiên đối thoại “1 - 1”. Lần họp bàn gần nhất của ông Biden và ông Putin là cuộc điện đàm hồi tháng Bảy và gặp mặt trực tiếp ở Geneva vào tháng Sáu.\n' +
    '\n' +
    'Theo phóng viên của đài truyền hình Nga đưa tin từ điện Kremlin, ông Putin có một phiên dịch viên ngồi ở phòng riêng để tuân thủ “chặt chẽ khuôn mẫu họp bàn 1- 1”. Nhưng trái lại, ông Biden lại có cả một đội ngũ cùng dự họp.\n' +
    '\n' +
    'Bức ảnh Nhà Trắng công bố cho thấy trong Phòng Tình huống, ngồi cùng Tổng thống Biden có một phiên dịch viên cùng Ngoại trưởng Antony Blinken, Cố vấn An ninh Quốc gia Jake Sullivan và Giám đốc cấp cao về Nga thuộc Hội đồng An ninh quốc gia Mỹ Eric Green.\n' +
    '\n' +
    'Xung quanh các bức tường trong phòng họp của Tổng thống Biden là màn hình tivi chiếu hình ảnh Tổng thống Putin ngồi một mình trong phòng họp trực tuyến tại Nga.\n' +
    '\n' +
    'Liên quan tới nội dung trong cuộc họp trực tuyến hôm 7/12, Nhà Trắng cho biết ông Biden đã bày tỏ “mối quan ngại sâu sắc” về vấn đề Ukraine và thảo luận về mã độc tống tiền, cùng “các vấn đề mang tính khu vực như Iran”.\n' +
    '\n' +
    'Trong khi đó, điện Kremlin cho hay Tổng thống Putin đã yêu cầu các bên thuộc liên minh NATO do Mỹ đứng đầu đảm bảo không mở rộng hoạt động sang phía đông.\n' +
    '\n' +
    'Ngoài ra, sau cuộc họp trực tuyến với ông Putin, Tổng thống Biden còn liên lạc với các nhà lãnh đạo Anh, Pháp, Đức và Italy để thông tin nhanh về kết quả của sự kiện. Ông Biden cũng sẽ nói chuyện với Tổng thống Ukraine Volodymyr Zelensky vào ngày 9/12, theo Cố vấn An ninh Quốc gia Mỹ Sullivan.\n' +
    '\n' +
    '“Chúng tôi vẫn tin rằng Tổng thống Putin chưa đưa ra quyết định xâm chiếm thêm Ukraine”, ông Sullivan nói sau khi kết thúc hội nghị trực tuyến giữa hai nhà lãnh đạo Nga – Mỹ.\n' +
    '\n' +
    'Ông Sullivan nói thêm, “điều mà Tổng thống Biden làm hôm nay là nói rõ về những hậu quả, nếu như ông Putin chọn phương án tấn công”.\n' +
    '\n' +
    'Cũng trong ngày 7/12, chia sẻ với Fox News, Thượng nghị sĩ đảng Cộng hòa tại bang Mississippi là ông Roger Wicker cho rằng khả năng hoạt động triển khai quân trên mặt đất và tấn công hạt nhân chống lại Nga là điều Mỹ thực hiện, một khi xảy ra xung đột ở Ukraine.\n' +
    '\n' +
    '“Tôi sẽ không loại trừ hành động quân sự. Tôi cho rằng chúng ta sẽ phạm phải sai lầm khi loại bỏ các phương án khỏi bàn thảo luận và tôi hy vọng Tổng thống tính tới các phương án này”, ông Wicker cho hay.\n' +
    '\n' +
    '“Tôi sẽ không loại bỏ phương án điều động binh sĩ trên mặt đất và Mỹ cũng không nên loại bỏ phương án sử dụng vũ khí hạt nhân trước tiên để chống lại Nga”, ông Wicker nói thêm.\n' +
    '\n' +
    'Tuy nhiên, những lời bình luận của ông Wicker đã vấp phải sự chỉ trích mạnh mẽ. Nhiều người nhận định đây là phát ngôn “mất trí” và “tàn bạo”.\n' +
    '\n' +
    'Điển hình, ông Jon Wolfsthal, cựu Trợ lý đặc biệt về kiểm soát vũ khí và hạn chế phổ biến vũ khí hạt nhân thuộc chính quyền của Tổng thống Biden đã gọi tuyên bố của ông Wicker là “nguy hiểm và thiếu trách nhiệm”.\n' +
    '\n' +
    'Trước thềm cuộc họp trực tuyến hôm 7/12, chính quyền của Tổng thống Biden đã nhiều lần cáo buộc Moscow có kế hoạch tấn công Ukraine. Về phần mình, điện Kremlin khẳng định đây chỉ là “tin giả”.'
  results: Array<Entry> = []

  @ViewChild("textareaRef", { static: true, read: ViewContainerRef }) textareaRef!: ViewContainerRef
  @ViewChild("aside", { static: true, read: ViewContainerRef }) aside!: ViewContainerRef

  private textarea!: HTMLTextAreaElement
  private sub?: Subscription;

  constructor(private api: ApiService, private cr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.textarea = this.textareaRef.element.nativeElement as HTMLTextAreaElement
  }

  dich() {
    const tu = this.textarea.value.substr(
      this.textarea.selectionStart,
      this.textarea.selectionEnd - this.textarea.selectionStart
    ).replace(new RegExp('[()\\[\\]\'\"!.,?/]', 'g'), ' ').trim()

    if (!tu) {
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
  }
}
