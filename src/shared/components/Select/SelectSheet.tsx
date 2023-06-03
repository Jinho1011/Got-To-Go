import React, { ForwardedRef, forwardRef, useCallback, useMemo } from "react";
import { Text, Pressable, FlatList } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import styled from "styled-components";
import { palette } from "@theme/themes";
// eslint-disable-next-line max-len
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

interface BottomSheetProps {
  title: string;

  data: string[];
  onPress: (item: string) => void;
}

const SelectSheet = forwardRef(
  (
    { title, data, onPress }: BottomSheetProps,
    bottomSheetRef: ForwardedRef<BottomSheet>,
  ) => {
    const snapPoints = useMemo(() => ["60%"], []);

    const renderBackdrop = useCallback(
      (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        // containerStyle={isOpen ? { backgroundColor: "rgba(0,0,0,0.4)" } : {}}
        backgroundStyle={{ backgroundColor: "#282828" }}
        handleStyle={{
          backgroundColor: "#282828",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <SheetContainer>
          <Title>{title}</Title>
          <FlatList
            data={data}
            renderItem={(info) => {
              return (
                <Item onPress={() => onPress(info.item)}>
                  <ItemText>{info.item}</ItemText>
                </Item>
              );
            }}
          />
        </SheetContainer>
      </BottomSheet>
    );
  },
);

export default SelectSheet;

const Title = styled(Text)`
  color: ${palette.white};
  font-weight: 600;
  font-size: 19px;
  margin-bottom: 20px;
`;

const Item = styled(Pressable)`
  margin-bottom: 24px;
`;

const ItemText = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  color: #cacaca;
`;

const SheetContainer = styled(BottomSheetView)`
  padding: 20px 20px 80px 20px;
`;
