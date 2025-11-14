import type { LegendListRenderItemProps } from "@legendapp/list";
import { LegendList } from "@legendapp/list";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Select, ScrollShadow, useThemeColor } from "heroui-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Locale, isLocale } from "@/enums/locale.enum";
import i18n from "@/translations";
import { useLocale } from "@/translations/utils";

const Content = () => {
  const { t } = useTranslation();
  const themeColorOverlay = useThemeColor("overlay");
  const data = [
    { id: Locale.en, label: t(`language.${Locale.en}`) },
    { id: Locale.zh_tw, label: t(`language.${Locale.zh_tw}`) },
  ];
  const renderItem = ({
    item,
  }: LegendListRenderItemProps<(typeof data)[0]>) => {
    return (
      <Select.Item
        value={item.id}
        key={item.id}
        label={item.label}
        className="p-2"
      />
    );
  };
  return (
    <ScrollShadow
      LinearGradientComponent={LinearGradient}
      color={themeColorOverlay}>
      <LegendList data={data} renderItem={renderItem} className="p-5" />
    </ScrollShadow>
  );
};

export const LocaleSelector = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const insets = useSafeAreaInsets();
  const themeColorMuted = useThemeColor("muted");

  const handleValueChange = (
    option: { value: string; label: string } | undefined
  ) => {
    if (option && isLocale(option.value)) {
      i18n.changeLanguage(option.value);
    }
  };

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={{
        value: locale,
        label: t(`language.${locale}`),
      }}>
      <Select.Trigger asChild>
        <Button variant="secondary">
          <Select.Value
            placeholder={t(`language.${locale}`)}
            numberOfLines={1}
            className="text-accent"
          />
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content
          presentation="bottom-sheet"
          snapPoints={["35%"]}
          detached
          enableDynamicSizing={false}
          enableOverDrag={false}
          backgroundStyle={{
            backgroundColor: "transparent",
          }}
          handleStyle={{
            height: 8,
          }}
          handleIndicatorStyle={{
            width: 42,
            backgroundColor: themeColorMuted,
          }}
          bottomSheetViewClassName="h-full mx-3 rounded-[32px] border border-divider/20 bg-overlay overflow-hidden"
          bottomSheetViewProps={{
            style: {
              padding: 0,
            },
          }}
          bottomInset={insets.bottom + 4}>
          <Content />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};
