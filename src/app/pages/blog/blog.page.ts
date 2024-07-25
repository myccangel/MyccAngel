import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit, OnDestroy {
  blogs = [
    {
      image: 'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
      text: "Inflammatory Bowel Disease (IBD) is a chronic condition that affects the digestive tract, primarily including Crohn's disease and ulcerative colitis. These diseases cause inflammation and can lead to symptoms such as severe diarrhea, abdominal pain, fatigue, and weight loss. The exact cause of IBD is unknown, but it is believed to involve a combination of genetic, environmental, and immune system factors. Managing IBD typically requires a multifaceted approach, including medication, lifestyle changes, and sometimes surgery, to reduce inflammation and maintain long-term remission."
    },
    {
      image: 'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
      text: "Living with Inflammatory Bowel Disease (IBD) can be challenging due to its unpredictable nature and impact on daily life. IBD encompasses two main types: Crohn's disease, which can affect any part of the gastrointestinal tract, and ulcerative colitis, limited to the colon and rectum. Symptoms often include chronic pain, persistent diarrhea, and nutritional deficiencies. Diagnosis usually involves endoscopic procedures and imaging studies. While there is no cure for IBD, treatment focuses on controlling symptoms and preventing complications through medication, dietary adjustments, and in some cases, surgical intervention."
    },
    // Add more blog posts as needed
  ];

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    // Perform any necessary cleanup here
  }

  uploadImage(blog: any) {
    // Logic for uploading an image
    console.log('Upload image for', blog);
  }

  editBlog(blog: any) {
    // Logic for editing a blog post
    console.log('Edit blog', blog);
  }

  seeAllBlogs() {
    // Example: Navigate to a new route to display all blogs
    // this.router.navigate(['/all-blogs']); // Replace '/all-blogs' with your actual route
  }
}
