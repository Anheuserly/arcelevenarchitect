import os

html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Offer Letter | Jyoti Tomar | ARC 11 ARCHITECT</title>
  <link rel="stylesheet" href="offer-letter.css" />
</head>
<body>
  <!-- PAGE 1 -->
  <main class="sheet">
    <img class="geometry geometry--top" src="geometry-study.jpeg" alt="" aria-hidden="true" />
    <img class="geometry geometry--bottom" src="geometry-study.jpeg" alt="" aria-hidden="true" />

    <header class="letterhead">
      <div class="brand-lockup">
        <div class="brand-mark">
          <img src="geometry-study.jpeg" alt="ARC 11 Architect mark" />
        </div>
        <div class="brand-copy">
          <div class="brand-name">ARC 11 ARCHITECT</div>
          <div class="brand-tagline">Architecture · Interiors · Project Delivery</div>
        </div>
      </div>
      <div class="company-meta">
        <strong>HEAD OFFICE</strong>
        <span>Plot No. 535, Second Floor, Left Side</span>
        <span>Khasra No. 60, 128-D21, Chattarpur Pahadi</span>
        <span>New Delhi — 110074</span>
        <span>+91 85273 78555 · +91 96500 58444</span>
        <span>arcelevenarchitect.com</span>
      </div>
    </header>

    <section class="doc-title-row">
      <div>
        <p class="eyebrow">EMPLOYMENT</p>
        <h1>Offer Letter</h1>
      </div>
      <div class="doc-meta">
        <div><span>Date</span><strong>24 August 2026</strong></div>
        <div><span>Ref.</span><strong>ARC11/HR/2026/001</strong></div>
      </div>
    </section>

    <section class="recipient">
      <p>To,</p>
      <h2>Ms. Jyoti Tomar</h2>
      <p>Chhatarpur, New Delhi</p>
    </section>

    <section class="subject-line">
      <span>Subject</span>
      <strong>Offer for the position of Interior Designer</strong>
    </section>

    <section class="letter-body">
      <p>Dear Jyoti,</p>
      <p>
        We are pleased to offer you an opportunity to join <strong>ARC 11 ARCHITECT</strong> as an
        <strong>Interior Designer</strong>. Your profile reflects an interest in space planning, design
        visualization and detailed interior documentation, which aligns well with the nature of work
        undertaken by our studio.
      </p>
      <p>
        Your engagement will begin with a <strong>two-month probationary evaluation period</strong>.
        During this period, your performance, design understanding, communication, attendance,
        quality of drawings, software proficiency, ability to follow project standards and overall
        contribution to the studio will be reviewed.
      </p>

      <div class="offer-grid">
        <div class="offer-card offer-card--wide">
          <span>POSITION</span>
          <strong>Interior Designer</strong>
        </div>
        <div class="offer-card">
          <span>TEST / PROBATION PERIOD</span>
          <strong>2 Months</strong>
        </div>
        <div class="offer-card">
          <span>MONTHLY COMPENSATION</span>
          <strong>₹12,000</strong>
          <small>During the evaluation period</small>
        </div>
        <div class="offer-card">
          <span>WORK LOCATION</span>
          <strong>New Delhi</strong>
          <small>Office / project sites as assigned</small>
        </div>
        <div class="offer-card">
          <span>JOINING DATE</span>
          <strong>25-August-2026</strong>
        </div>
      </div>

      <h3>1. Roles & Responsibilities</h3>
      <ul class="terms">
        <li>
          Your work will include space planning, concept development, mood boards, 2D drawings, working drawings, elevations, coordination, presentation support, 3D visualization and other project tasks assigned by the studio.
        </li>
        <li>
          You will work closely with the principal architect and senior designers to ensure that all project deliverables meet the high standards of ARC 11 ARCHITECT.
        </li>
        <li>
          You will be expected to participate in client meetings, site visits, and vendor coordinations as required.
        </li>
      </ul>

      <h3>2. Compensation and Benefits</h3>
      <ul class="terms">
        <li>
          <strong>Compensation during evaluation:</strong> You will receive ₹12,000 (Rupees Twelve Thousand Only) per month for the two-month evaluation period, subject to attendance and applicable company policies and statutory deductions, if any.
        </li>
        <li>
          <strong>Performance review:</strong> At the completion of the two-month period, your work will be reviewed. Based on performance, responsibilities, business requirements and mutual discussion, the Company may confirm your employment and may revise your compensation. Any revision will be communicated separately in writing and is not automatic.
        </li>
        <li>
          <strong>Expenses:</strong> Approved expenses incurred during official site visits or client meetings will be reimbursed as per standard company policy.
        </li>
      </ul>

      <h3>3. Working Hours & Leave Policy</h3>
      <ul class="terms">
        <li>
          <strong>Working Hours:</strong> The standard working hours are from 10:00 AM to 7:00 PM, Monday through Saturday. You may be required to work additional hours depending on project deadlines and client requirements.
        </li>
      </ul>

    </section>

    <footer>
      <span>ARC 11 ARCHITECT</span>
      <span class="footer-dot">•</span>
      <span>Spaces shaped by light, proportion and lived rhythm.</span>
      <span class="footer-page">Page 1 of 2</span>
    </footer>
  </main>

  <!-- PAGE 2 -->
  <main class="sheet sheet--page-2">
    <img class="geometry geometry--top" src="geometry-study.jpeg" alt="" aria-hidden="true" />
    <img class="geometry geometry--bottom" src="geometry-study.jpeg" alt="" aria-hidden="true" />

    <header class="letterhead letterhead--compact">
      <div class="brand-lockup">
        <div class="brand-mark">
          <img src="geometry-study.jpeg" alt="ARC 11 Architect mark" />
        </div>
        <div class="brand-copy">
          <div class="brand-name">ARC 11 ARCHITECT</div>
        </div>
      </div>
      <div class="company-meta">
        <strong>Offer Letter - Jyoti Tomar</strong>
        <span>Ref. ARC11/HR/2026/001</span>
      </div>
    </header>

    <section class="letter-body">
      <ul class="terms terms--continued">
        <li>
          <strong>Leave:</strong> During the probation period, any leaves taken will be considered as leave without pay. Post confirmation, your leave eligibility will be governed by the standard company leave policy.
        </li>
        <li>
          <strong>Holidays:</strong> You will be entitled to public holidays as declared by the studio at the beginning of the calendar year.
        </li>
      </ul>

      <h3>4. Confidentiality & Intellectual Property</h3>
      <ul class="terms">
        <li>
          <strong>Confidentiality:</strong> Project drawings, designs, presentations, documents, data, client details, financial information, and other work produced or accessed during your engagement are strictly confidential and remain the exclusive property of ARC 11 ARCHITECT. You must not disclose any such information to any third party during or after your employment.
        </li>
        <li>
          <strong>Intellectual Property:</strong> All designs, concepts, drawings, models, and any other intellectual property created by you during your employment with ARC 11 ARCHITECT will be the sole property of the company. You agree to waive any moral rights in such works and will promptly disclose and assign all such intellectual property to the company.
        </li>
      </ul>

      <h3>5. Work Standards & Conduct</h3>
      <ul class="terms">
        <li>
          <strong>Professional Conduct:</strong> You are expected to maintain the highest standards of professional conduct, punctuality, accuracy, and responsible handling of drawings, project files, client information and all Company resources.
        </li>
        <li>
          <strong>Conflict of Interest:</strong> During your employment with ARC 11 ARCHITECT, you are not permitted to engage in any other employment, consulting, or freelance work without prior written consent from the company.
        </li>
      </ul>

      <h3>6. Termination of Employment</h3>
      <ul class="terms">
        <li>
          During the probation period, either party may terminate this agreement by providing one week's notice or salary in lieu thereof.
        </li>
        <li>
          Post confirmation, employment may be terminated by either party by providing one month's written notice or salary in lieu thereof.
        </li>
        <li>
          The Company reserves the right to terminate your employment immediately, without notice or compensation, in the event of any material breach of contract, gross misconduct, fraud, or negligence.
        </li>
      </ul>

      <p class="closing-copy">
        We look forward to your contribution and hope this opportunity develops into a productive
        long-term association. Please sign the acceptance section below and return a copy of this
        letter to confirm your acceptance of the offer.
      </p>

      <p class="signoff">For <strong>ARC 11 ARCHITECT</strong></p>
    </section>

    <section class="signatures">
      <div class="signature-box">
        <div class="signature-space"></div>
        <strong>Authorized Signatory</strong>
        <span>ARC 11 ARCHITECT</span>
        <span></span>
      </div>
      <div class="signature-box signature-box--candidate">
        <p class="acceptance">
          <strong>Candidate Acceptance:</strong> I, Jyoti Tomar, have read and understood all the terms and conditions stated above and accept this offer of employment.
        </p>
        <div class="signature-space"></div>
        <strong>Candidate Signature</strong>
        <span>Jyoti Tomar</span>
        <span>Date: __________________</span>
      </div>
    </section>

    <footer>
      <span>ARC 11 ARCHITECT</span>
      <span class="footer-dot">•</span>
      <span>Spaces shaped by light, proportion and lived rhythm.</span>
      <span class="footer-page">Page 2 of 2</span>
    </footer>
  </main>
</body>
</html>"""

with open('/Volumes/HP_P500/GitHub/arcelevenarchitect/public/offer-letters/jyoti/offer-letter.html', 'w') as f:
    f.write(html)

css_append = """
/* Enhancements for multi-page and logo */
.brand-mark {
  width: 24mm;
  height: 24mm;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-mark img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sheet {
  margin-bottom: 12mm; /* Space between pages on screen */
}

.letterhead--compact {
  padding-bottom: 2mm;
  margin-bottom: 2mm;
}

.terms--continued {
  margin-top: -2mm;
}

ul.terms {
  list-style-type: disc;
}

ul.terms li {
  padding-left: 0;
  margin-left: 2mm;
}

@media print {
  .sheet {
    margin-bottom: 0;
    page-break-after: always;
  }
  .sheet:last-child {
    page-break-after: auto;
  }
}
"""

with open('/Volumes/HP_P500/GitHub/arcelevenarchitect/public/offer-letters/jyoti/offer-letter.css', 'r') as f:
    css_content = f.read()

# Replace border and overflow from original brand-mark
css_content = css_content.replace('''
.brand-mark {
  width: 14mm;
  height: 14mm;
  border: 1px solid #bbb6ac;
  overflow: hidden;
  background: #fff;
}

.brand-mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}''', '')

with open('/Volumes/HP_P500/GitHub/arcelevenarchitect/public/offer-letters/jyoti/offer-letter.css', 'w') as f:
    f.write(css_content + "\n" + css_append)
