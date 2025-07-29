// store/useWidgetStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useWidgetStore = create(
  devtools(
    (set, get) => ({
      // UI States
      selectedLayout: "",
      isMobileMenuOpen: false,
      isCollapsed: false,
      editMode: false,
      editId: null,

      // User States
      token: null,
      userEmail: "",
      userInitial: "",

      // Folder and Feed States
      folderId: 0,
      customFeedUrl: null,
      folderSelected: false,
      rssInputText: "",
      widgetName: "",

      // General Customization States
      showBorder: true,
      borderColor: "#e2e2e2",
      textAlign: "left",
      fontStyle: "default",
      autoscroll: "true",
      cardHeight: undefined,
      cardWidth: undefined,

      // Feed Title Customization States
      bgColor: "#FFFFFF",
      sizeFont: 16,
      textColor: "#e2e2e2",
      isBold: false,
      mainTitle: "",

      // Feed Content Customization States
      postNumber: 3,
      feedBgColor: "#FFFFFF",
      isTitle: true,
      titleBold: false,
      showDesc: true,
      descFont: 14,

      // Form Data (consolidated)
      formData: {
        widthMode: "Responsive (Mobile friendly)",
        width: "",
        heightMode: "posts",
        height: "",
        autoscroll: "true",
        fontStyle: "default",
        border: "true",
        borderColor: "#e2e2e2",
        textAlign: "left",
        widgetName: "",
        folder_id: 0,
        bgColor: "#FFFFFF",
        sizeFont: 16,
        textColor: "#e2e2e2",
        isBold: false,
        mainTitle: "",
        showDesc: true,
        descFont: 14,
        feedBgColor: "#FFFFFF",
        isTitle: true,
        postNumber: 3,
        titleBold: false,
        dateFormat: "month-dd-yyyy",
        rssInputText: "",
        selectedLayout: "",
      },

      existingSettings: {},

      // Actions for UI
      setSelectedLayout: (layout) => set({ selectedLayout: layout }),
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      setEditMode: (mode, id = null) => set({ editMode: mode, editId: id }),

      // Actions for User
      setToken: (token) => set({ token }),
      setUserData: (email, initial) =>
        set({ userEmail: email, userInitial: initial }),

      // Actions for Feed/Folder
      setFolderId: (id) => {
        set({ folderId: id });
        // Also update formData
        set((state) => ({
          formData: { ...state.formData, folder_id: id || 0 },
        }));
      },
      setCustomFeedUrl: (url) => set({ customFeedUrl: url }),
      setRssInputText: (text) => set({ rssInputText: text }),
      setWidgetName: (name) => set({ widgetName: name }),
      setFolderSelected: (selected) => set({ folderSelected: selected }),

      // Actions for General Settings
      setShowBorder: (show) => set({ showBorder: show }),
      setBorderColor: (color) => set({ borderColor: color }),
      setTextAlign: (align) => set({ textAlign: align }),
      setFontStyle: (style) => set({ fontStyle: style }),
      setAutoscroll: (scroll) => set({ autoscroll: scroll }),
      setCardDimensions: (height, width) =>
        set({ cardHeight: height, cardWidth: width }),

      // Actions for Title Settings
      setBgColor: (color) => set({ bgColor: color }),
      setSizeFont: (size) => set({ sizeFont: size }),
      setTextColor: (color) => set({ textColor: color }),
      setBold: (bold) => set({ isBold: bold }),
      setMainTitle: (title) => set({ mainTitle: title }),

      // Actions for Content Settings
      setPostNumber: (num) => set({ postNumber: num }),
      setFeedBgColor: (color) => set({ feedBgColor: color }),
      setIsTitle: (show) => set({ isTitle: show }),
      setTitleBold: (bold) => set({ titleBold: bold }),
      setShowDesc: (show) => set({ showDesc: show }),
      setDescFont: (size) => set({ descFont: size }),

      // Form Data Actions
      handleFormChange: (name, value) => {
        // Update specific states based on field name
        const state = get();

        if (name === "widgetName") state.setWidgetName(value);
        if (name === "height") set({ cardHeight: value });
        if (name === "width") set({ cardWidth: value });
        if (name === "feedUrl") state.setCustomFeedUrl(value);
        if (name === "selectedLayout") state.setSelectedLayout(value);

        // Always update formData
        set((prevState) => ({
          formData: { ...prevState.formData, [name]: value },
        }));
      },

      setFormData: (data) => set({ formData: data }),
      setExistingSettings: (settings) => set({ existingSettings: settings }),

      // Default Settings
      getDefaultSettings: () => ({
        bgColor: "#FFFFFF",
        sizeFont: 16,
        mainTitle: "RSS Feeds",
        textAlign: "left",
        textColor: "#8a8989ff",
        isBold: false,
        border: true,
        borderColor: "#000000",
        height: "100px",
        width: "100%",
        fontStyle: "normal",
        autoscroll: false,
        heightMode: "",
        widthMode: "",
        showDesc: false,
        descFont: 14,
        feedBgColor: "#f0f0f0",
        isTitle: true,
        postNumber: 3,
        titleBold: false,
        selectedLayout: "",
      }),

      // Reset All Settings
      resetAllSettings: () => {
        const defaultFormData = {
          widthMode: "Responsive (Mobile friendly)",
          width: "",
          heightMode: "posts",
          height: "",
          autoscroll: "true",
          fontStyle: "default",
          border: "true",
          borderColor: "#e2e2e2",
          textAlign: "left",
          widgetName: "",
          folder_id: 0,
          bgColor: "#FFFFFF",
          sizeFont: 16,
          textColor: "#e2e2e2",
          isBold: false,
          mainTitle: "",
          showDesc: true,
          descFont: 14,
          feedBgColor: "#FFFFFF",
          isTitle: true,
          postNumber: 3,
          titleBold: false,
          dateFormat: "month-dd-yyyy",
          selectedLayout: "",
        };

        set({
          showBorder: true,
          borderColor: "#e2e2e2",
          textAlign: "left",
          fontStyle: "default",
          autoscroll: "true",
          cardHeight: undefined,
          cardWidth: undefined,
          selectedLayout: "",
          folderId: 0,
          widgetName: "",
          customFeedUrl: null,
          rssInputText: "",
          bgColor: "#FFFFFF",
          sizeFont: 16,
          textColor: "#e2e2e2",
          isBold: false,
          mainTitle: "RSS Feeds",
          titleBold: false,
          feedBgColor: "#FFFFFF",
          showDesc: true,
          isTitle: true,
          descFont: 14,
          postNumber: 3,
          formData: defaultFormData,
        });
      },

      // Load Settings (for edit mode)
      loadEditSettings: (data) => {
        const state = get();
        const defaultSettings = state.getDefaultSettings();

        // Parse set_data JSON
        let parsedSettings = {};
        try {
          parsedSettings = data.set_data ? JSON.parse(data.set_data) : {};
        } catch (err) {
          console.error("Invalid JSON in set_data:", err);
        }

        // Create merged settings object
        const mergedSettings = {
          ...defaultSettings,
          // Database columns
          widthMode: data.width_mode ?? defaultSettings.widthMode,
          width: data.width ?? defaultSettings.width,
          heightMode: data.height_mode ?? defaultSettings.heightMode,
          height: data.height ?? defaultSettings.height,
          autoscroll: data.autoscroll === "true" || data.autoscroll === true,
          fontStyle: data.font_style ?? defaultSettings.fontStyle,
          border: data.border === "true" || data.border === true,
          borderColor: data.border_color ?? defaultSettings.borderColor,
          textAlign: data.text_alignment ?? defaultSettings.textAlign,
          widgetName: data.widget_name ?? "",
          folder_id: parseInt(data.folder_id) || 0,
          // JSON settings (override DB columns where applicable)
          ...parsedSettings,
        };

        // Set all the states
        set({
          formData: mergedSettings,
          existingSettings: mergedSettings,
          widgetName: data.widget_name,
          cardHeight: mergedSettings.height,
          cardWidth: mergedSettings.width,
          folderId: mergedSettings.folder_id,
          mainTitle: mergedSettings.mainTitle,
          sizeFont: mergedSettings.sizeFont,
          isBold: mergedSettings.isBold,
          textColor: mergedSettings.textColor,
          bgColor: mergedSettings.bgColor,
          fontStyle: mergedSettings.fontStyle,
          textAlign: mergedSettings.textAlign,
          borderColor: mergedSettings.borderColor,
          showBorder: mergedSettings.border,
          autoscroll: mergedSettings.autoscroll.toString(),
        });

        // Handle custom feed URL
        if (data.feed_url) {
          set({
            customFeedUrl: data.feed_url,
            rssInputText: data.feed_url,
            folderId: -1,
          });
        }
      },
    }),
    {
      name: "widget-store", // name for devtools
    }
  )
);

export default useWidgetStore;
