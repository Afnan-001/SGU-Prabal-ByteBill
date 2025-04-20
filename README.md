<a id="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Chinmay1635/SGU-Prabal-ByteBill">
    <img src="https://afnan-001.github.io/deployed_images/minilogo.png" alt="Logo" width="80" height="80" align="center">
  </a>

  <h1 align="center">ByteBill</h3>

  <p align="center">
    <i>Automate your bills. Simplify your life.</i>
    <br />

</div>

## Demo
Here is a working live demo :  https://sgu-prabal-byte-bill.vercel.app/

Download the ByteBill Android App from :
https://www.mediafire.com/file/je5e9lxppqvk0ua/ByteBill.apk/file


## Site
### Landing Page
"This is where the magic begins."
# ![WebApp](https://afnan-001.github.io/deployed_images/landing_page.png)

### Landing Page (Continued)
# ![WebApp](https://afnan-001.github.io/deployed_images/landing_page2.png)

### Dashboard
# ![WebApp](https://afnan-001.github.io/deployed_images/dashboard.png)

### AI Transaction Scan
# ![WebApp](https://afnan-001.github.io/deployed_images/add_transaction.png)

### Future Spending Pattern Prediction
# ![WebApp](https://afnan-001.github.io/deployed_images/predict.png)

### Gmail Billings
# ![WebApp](https://afnan-001.github.io/deployed_images/gmail.png)



<!-- ABOUT THE PROJECT -->
## About The Project


**ByteBill** is a smart bill extraction app that connects with your Gmail account to automatically detect, extract, and organize billing information from your emails. Designed to simplify personal expense tracking, ByteBill uses the **Gmail API** and intelligent parsing to bring all your bills into one clean, accessible dashboard.

It also supports bill image uploads, using **Vision OCR** to extract key details from scanned or photographed receipts and bills — making it easier than ever to digitize your finances.

**But it doesn’t stop there** — ByteBill integrates with **BigQuery ML** to analyze your transaction history and predict future monthly spending patterns. Using these insights, it also recommends personalized saving hacks and financial tips to help you manage your money better.

Key Features:
* 🔐Secure Signup using Clerk and Gmail integration via **OAuth 2.0**
* 📥Auto-detection of bills and payment receipts received via email
* 🖼️**Vision OCR** for extracting data from uploaded bill images
* 📊Expense forecasting using BigQuery ML
* 💡Smart saving suggestions and financial insights
* 🧾Clean UI for viewing and managing extracted bills
* 🔎Search and filter options for quick access

**ByteBill** helps you turn inbox chaos and paper clutter into financial clarity — one byte at a time.


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![Framer Motion](https://img.shields.io/badge/Framer%20motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/")
* [![Tailwind CSS]()](https://tailwindcss.com/)
* [![Gemini](https://img.shields.io/badge/Gemini%20AI-4285F4?style=flat&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## 🚀Getting Started

Follow these steps to set up and run the ByteBill project locally.

## 🔧Prerequisites
Make sure you have the following installed:
* **Node.js** (v16 or later)
* **Next.js** (v15 or later)
* **Google Cloud** Project with:
  * Gmail API enabled
  * Vision API enabled
  * OAuth 2.0 credentials set up
  * BigQuery access for ML predictions



### 📦Installation


1. Clone the repository
   ```sh
   git clone https://github.com/Chinmay1635/SGU-Prabal-ByteBill.git
   cd SGU-Prabal-ByteBill
   ```
2. Install NPM packages
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up environment variables 
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=
   DIRECT_URL=

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

   GOOGLE_CREDENTIALS_B64=

   NEXT_PUBLIC_GOOGLE_CLIENT_ID=
   VITE_GOOGLE_CLIENT_SECRET=
   VITE_GOOGLE_REDIRECT_URI=
   VITE_GOOGLE_PROJECT_ID=

   GEMINI_API_KEY=

   RESEND_API_KEY=

   ARCJET_KEY=
   ```

4. Run the app locally
   ```sh
   npm run dev
   # or
   yarn run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Team
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Chinmay1635"><img src="https://avatars.githubusercontent.com/u/159155703?v=4" width="100px;" alt="Chinmay Kulkarni"/><br /><sub><b>Chinmay Kulkarni</b></sub></a><br/> </td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Afnan2op"><img src="https://avatars.githubusercontent.com/u/208136186?v=4" width="100px;" alt="Afnan Sayyad"/><br /><sub><b>Afnan Sayyad</b></sub></a><br/> </td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dumbsumit"><img src="https://avatars.githubusercontent.com/u/167517728?v=4" width="100px;" alt="Sumit Phalke"/><br /><sub><b>Sumit Phalke</b></sub></a><br/> </td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PIYUS1507"><img src="https://avatars.githubusercontent.com/u/164095652?v=4" width="100px;" alt="Piyush Rajurkar"/><br /><sub><b>Piyush Rajurkar</b></sub></a><br/> </td>
    </tr>
</tbody>
</table>

## Made by Sixth Sense ❤️


