# 📅 React Date Picker with Nepali (BS) to English (AD) Date Conversion

![npm](https://img.shields.io/npm/v/react-nepali-date)
![license](https://img.shields.io/github/license/yourusername/react-nepali-date)

A React component for picking dates that supports conversion between Nepali (BS) dates and English (AD) dates. This component allows users to select a date using a traditional date picker UI and seamlessly convert between BS and AD calendars.

## 🚀 Features

- 🎨 User-friendly date picker interface
- 🔄 Convert between Nepali (BS) and English (AD) dates
- 📅 Easy to integrate with React applications

## 📦 Installation

To install the component, use npm or yarn:

```bash
npm install react-nepali-date
# or
yarn add react-nepali-date
```

## 🛠️ Usage

**Import the Component:**

```jsx
import { DatePicker } from "react-nepali-date";
```

**Use the Component in Your Application:**

```jsx
import React, { useState } from "react";
import { DatePicker, NepaliDate } from "react-nepali-date";

function App() {
  const [date, setDate] = useState < string > new NepaliDate().toString();

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <DatePicker value={date} onChange={handleDateChange} language="en" />
    </div>
  );
}

export default App;
```

💻 Component Props

- `value` (`string`): The current selected date.
- `onChange` (`function`): Function that is called when the date changes.
- `language` ( `"en" | "np"` ) : for english and nepali date

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For any questions or feedback, please open an issue on GitHub or contact me directly.
