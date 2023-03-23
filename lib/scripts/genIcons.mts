import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const icons = [
  "AcademicCapIcon",
  "AdjustmentsHorizontalIcon",
  "AdjustmentsVerticalIcon",
  "ArchiveBoxArrowDownIcon",
  "ArchiveBoxIcon",
  "ArchiveBoxXMarkIcon",
  "ArrowDownCircleIcon",
  "ArrowDownIcon",
  "ArrowDownLeftIcon",
  "ArrowDownOnSquareIcon",
  "ArrowDownOnSquareStackIcon",
  "ArrowDownRightIcon",
  "ArrowDownTrayIcon",
  "ArrowLeftCircleIcon",
  "ArrowLeftIcon",
  "ArrowLeftOnRectangleIcon",
  "ArrowLongDownIcon",
  "ArrowLongLeftIcon",
  "ArrowLongRightIcon",
  "ArrowLongUpIcon",
  "ArrowPathIcon",
  "ArrowRightCircleIcon",
  "ArrowRightIcon",
  "ArrowRightOnRectangleIcon",
  "ArrowTopRightOnSquareIcon",
  "ArrowTrendingDownIcon",
  "ArrowTrendingUpIcon",
  "ArrowUpCircleIcon",
  "ArrowUpIcon",
  "ArrowUpLeftIcon",
  "ArrowUpOnSquareIcon",
  "ArrowUpOnSquareStackIcon",
  "ArrowUpRightIcon",
  "ArrowUpTrayIcon",
  "ArrowUturnDownIcon",
  "ArrowUturnLeftIcon",
  "ArrowUturnRightIcon",
  "ArrowUturnUpIcon",
  "ArrowsPointingInIcon",
  "ArrowsPointingOutIcon",
  "ArrowsRightLeftIcon",
  "ArrowsUpDownIcon",
  "AtSymbolIcon",
  "BackspaceIcon",
  "BackwardIcon",
  "BanknotesIcon",
  "Bars2Icon",
  "Bars3BottomLeftIcon",
  "Bars3BottomRightIcon",
  "Bars3CenterLeftIcon",
  "Bars3Icon",
  "Bars4Icon",
  "BarsArrowDownIcon",
  "BarsArrowUpIcon",
  "BeakerIcon",
  "BellAlertIcon",
  "BellIcon",
  "BellSlashIcon",
  "BellSnoozeIcon",
  "BoltIcon",
  "BoltSlashIcon",
  "BookOpenIcon",
  "BookmarkIcon",
  "BookmarkSlashIcon",
  "BookmarkSquareIcon",
  "BriefcaseIcon",
  "BuildingLibraryIcon",
  "BuildingOffice2Icon",
  "BuildingOfficeIcon",
  "BuildingStorefrontIcon",
  "CakeIcon",
  "CalculatorIcon",
  "CalendarDaysIcon",
  "CalendarIcon",
  "CameraIcon",
  "ChartBarIcon",
  "ChartBarSquareIcon",
  "ChartPieIcon",
  "ChatBubbleBottomCenterIcon",
  "ChatBubbleBottomCenterTextIcon",
  "ChatBubbleLeftEllipsisIcon",
  "ChatBubbleLeftIcon",
  "ChatBubbleLeftRightIcon",
  "ChatBubbleOvalLeftEllipsisIcon",
  "ChatBubbleOvalLeftIcon",
  "CheckBadgeIcon",
  "CheckCircleIcon",
  "CheckIcon",
  "ChevronDoubleDownIcon",
  "ChevronDoubleLeftIcon",
  "ChevronDoubleRightIcon",
  "ChevronDoubleUpIcon",
  "ChevronDownIcon",
  "ChevronLeftIcon",
  "ChevronRightIcon",
  "ChevronUpDownIcon",
  "ChevronUpIcon",
  "CircleStackIcon",
  "ClipboardDocumentCheckIcon",
  "ClipboardDocumentIcon",
  "ClipboardDocumentListIcon",
  "ClipboardIcon",
  "ClockIcon",
  "CloudArrowDownIcon",
  "CloudArrowUpIcon",
  "CloudIcon",
  "CodeBracketIcon",
  "CodeBracketSquareIcon",
  "Cog6ToothIcon",
  "Cog8ToothIcon",
  "CogIcon",
  "CommandLineIcon",
  "ComputerDesktopIcon",
  "CpuChipIcon",
  "CreditCardIcon",
  "CubeIcon",
  "CurrencyDollarIcon",
  "CurrencyEuroIcon",
  "CurrencyPoundIcon",
  "CurrencyRupeeIcon",
  "CurrencyYenIcon",
  "CursorArrowRaysIcon",
  "CursorArrowRippleIcon",
  "DevicePhoneMobileIcon",
  "DeviceTabletIcon",
  "DocumentArrowDownIcon",
  "DocumentArrowUpIcon",
  "DocumentChartBarIcon",
  "DocumentCheckIcon",
  "DocumentDuplicateIcon",
  "DocumentIcon",
  "DocumentMagnifyingGlassIcon",
  "DocumentMinusIcon",
  "DocumentPlusIcon",
  "DocumentTextIcon",
  "EllipsisHorizontalCircleIcon",
  "EllipsisHorizontalIcon",
  "EllipsisVerticalIcon",
  "EnvelopeIcon",
  "EnvelopeOpenIcon",
  "ExclamationCircleIcon",
  "ExclamationTriangleIcon",
  "EyeIcon",
  "EyeSlashIcon",
  "FaceFrownIcon",
  "FaceSmileIcon",
  "FilmIcon",
  "FingerPrintIcon",
  "FireIcon",
  "FlagIcon",
  "FolderArrowDownIcon",
  "FolderIcon",
  "FolderMinusIcon",
  "FolderOpenIcon",
  "FolderPlusIcon",
  "ForwardIcon",
  "FunnelIcon",
  "GifIcon",
  "GiftIcon",
  "GiftTopIcon",
  "GlobeAltIcon",
  "GlobeAmericasIcon",
  "GlobeAsiaAustraliaIcon",
  "GlobeEuropeAfricaIcon",
  "HandRaisedIcon",
  "HandThumbDownIcon",
  "HandThumbUpIcon",
  "HashtagIcon",
  "HeartIcon",
  "HomeIcon",
  "HomeModernIcon",
  "IdentificationIcon",
  "InboxArrowDownIcon",
  "InboxIcon",
  "InboxStackIcon",
  "InformationCircleIcon",
  "KeyIcon",
  "LanguageIcon",
  "LifebuoyIcon",
  "LightBulbIcon",
  "LinkIcon",
  "ListBulletIcon",
  "LockClosedIcon",
  "LockOpenIcon",
  "MagnifyingGlassCircleIcon",
  "MagnifyingGlassIcon",
  "MagnifyingGlassMinusIcon",
  "MagnifyingGlassPlusIcon",
  "MapIcon",
  "MapPinIcon",
  "MegaphoneIcon",
  "MicrophoneIcon",
  "MinusCircleIcon",
  "MinusIcon",
  "MoonIcon",
  "MusicalNoteIcon",
  "NewspaperIcon",
  "NoSymbolIcon",
  "PaperAirplaneIcon",
  "PaperClipIcon",
  "PauseIcon",
  "PencilIcon",
  "PencilSquareIcon",
  "PhoneArrowDownLeftIcon",
  "PhoneArrowUpRightIcon",
  "PhoneIcon",
  "PhoneXMarkIcon",
  "PhotoIcon",
  "PlayIcon",
  "PlayPauseIcon",
  "PlusCircleIcon",
  "PlusIcon",
  "PresentationChartBarIcon",
  "PresentationChartLineIcon",
  "PrinterIcon",
  "PuzzlePieceIcon",
  "QrCodeIcon",
  "QuestionMarkCircleIcon",
  "QueueListIcon",
  "RadioIcon",
  "ReceiptPercentIcon",
  "ReceiptRefundIcon",
  "RectangleGroupIcon",
  "RectangleStackIcon",
  "RssIcon",
  "ScaleIcon",
  "ScissorsIcon",
  "ServerIcon",
  "ServerStackIcon",
  "ShareIcon",
  "ShieldCheckIcon",
  "ShieldExclamationIcon",
  "ShoppingBagIcon",
  "ShoppingCartIcon",
  "SignalIcon",
  "SignalSlashIcon",
  "SparklesIcon",
  "SpeakerWaveIcon",
  "SpeakerXMarkIcon",
  "Square2StackIcon",
  "Squares2X2Icon",
  "SquaresPlusIcon",
  "StarIcon",
  "StopIcon",
  "SunIcon",
  "SwatchIcon",
  "TableCellsIcon",
  "TagIcon",
  "TicketIcon",
  "TrashIcon",
  "TruckIcon",
  "UserCircleIcon",
  "UserGroupIcon",
  "UserIcon",
  "UserPlusIcon",
  "UsersIcon",
  "VideoCameraIcon",
  "VideoCameraSlashIcon",
  "ViewColumnsIcon",
  "WifiIcon",
  "WrenchIcon",
  "WrenchScrewdriverIcon",
  "XCircleIcon",
  "XMarkIcon",
];

const generatedComment = "// Code generated via yarn gen:icons. DO NOT EDIT";

const createIconFile = (iconName: string) => `${generatedComment}

/* eslint-disable react/display-name */
import { ${iconName} as Hero${iconName}Mini } from "@heroicons/react/20/solid";
import { ${iconName} as Hero${iconName}Outline } from "@heroicons/react/24/outline";
import { ${iconName} as Hero${iconName}Solid } from "@heroicons/react/24/solid";
import { forwardRef, Ref } from "react";

import { Icon } from "../Icon";
import { Props } from "../Icon.types";

export const ${iconName}Outline = forwardRef(
  (props: Props, ref: Ref<SVGSVGElement>) => {
    return (
      <Icon {...props} ref={ref}>
        <Hero${iconName}Outline />
      </Icon>
    );
  }
);

export const ${iconName}Solid = forwardRef(
  (props: Props, ref: Ref<SVGSVGElement>) => {
    return (
      <Icon {...props} ref={ref}>
        <Hero${iconName}Solid />
      </Icon>
    );
  }
);

export const ${iconName}Mini = forwardRef(
  (props: Props, ref: Ref<SVGSVGElement>) => {
    return (
      <Icon {...props} ref={ref}>
        <Hero${iconName}Mini />
      </Icon>
    );
  }
);
`;

const getIndexEntry = (
  iconName: string
) => `export { ${iconName}Outline, ${iconName}Solid, ${iconName}Mini, ${iconName}Solid as ${iconName} } from "./icons/${iconName}";
`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const indexEntries = icons.map((icon) => {
  const iconFile = createIconFile(icon);
  fs.writeFileSync(
    path.join(__dirname, `../src/components/icon/icons/${icon}.tsx`),
    iconFile
  );

  return getIndexEntry(icon);
});

if (indexEntries.length) {
  fs.writeFileSync(
    path.join(__dirname, `../src/components/icon/index.ts`),
    `${generatedComment}\n\n${indexEntries.join("\n")}`
  );
}
