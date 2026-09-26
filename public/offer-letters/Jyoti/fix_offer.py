import re

html_path = '/Volumes/HP_P500/GitHub/arcelevenarchitect/public/offer-letters/jyoti/offer-letter.html'
with open(html_path, 'r') as f:
    content = f.read()

page1_terms = """
      <h3>Terms of the Offer</h3>
      <ol class="terms">
        <li>
          <strong>Compensation during evaluation:</strong> You will receive ₹12,000 (Rupees Twelve
          Thousand Only) per month for the two-month evaluation period, subject to attendance and
          applicable company policies and statutory deductions, if any.
        </li>
        <li>
          <strong>Performance review:</strong> At the completion of the two-month period, your work
          will be reviewed. Based on performance, responsibilities, business requirements and mutual
          discussion, the Company may confirm your employment and may revise your compensation.
          Any revision will be communicated separately in writing and is not automatic.
        </li>
        <li>
          <strong>Role & responsibilities:</strong> Your work may include space planning, concept
          development, mood boards, 2D drawings, working drawings, elevations, coordination,
          presentation support, 3D visualization and other project tasks assigned by the studio.
        </li>
        <li>
          <strong>Work standards:</strong> You are expected to maintain professional conduct,
          punctuality, accuracy, confidentiality and responsible handling of drawings, project files,
          client information and all Company resources.
        </li>
        <li>
          <strong>Working Hours & Schedule:</strong> The standard working hours are from 10:00 AM to 7:00 PM, Monday through Saturday. You may be required to work additional hours depending on project deadlines and client requirements.
        </li>
      </ol>
"""

# Replace the closing stuff and signatures to be on page 2
# Wait, I need to split the HTML into Page 1 and Page 2.

# I'll just write the entire HTML out.
