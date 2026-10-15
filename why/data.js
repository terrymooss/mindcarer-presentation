/* Based on WHY/STORYBOARD.md v0.1; draft timing only until Moonjung tracks exist. */
window.WHY_SCENES = [
 {id:1,d:9,short:6,title:'약은 점점 더 쉽게 살 수 있습니다.',display:['약은 점점 더','쉽게 살 수 있습니다.'],subtitle:'대량 진열, 빠른 선택, 온라인 주문',narration:'대량 진열, 빠른 선택, 온라인 주문. 약을 만나는 방식은 계속 달라지고 있습니다.',theme:'dark',art:'shelves'},
 {id:2,d:10,short:7,title:'그런데, 제대로 복용하고 있을까요?',display:['그런데, 제대로','복용하고 있을까요?'],subtitle:'편리한 구매와 안전한 복용은 같은 이야기가 아닙니다.',narration:'편리한 구매와 안전한 복용은 같은 이야기가 아닙니다.',theme:'dark',art:'bottle'},
 {id:3,d:10,short:7,title:'함께 먹는 약, 누가 확인할까요?',display:['함께 먹는 약,','누가 확인할까요?'],subtitle:'처방약 · 일반약 · 영양제, 겹치는 성분은 없을까요?',narration:'처방약과 일반약, 영양제에 같은 성분이 겹쳐 있지는 않을까요?',theme:'dark',art:'venn'},
 {id:4,d:10,short:0,title:'배송은 끝이 아닙니다.',display:['배송은','끝이 아닙니다.'],subtitle:'약을 받은 뒤에도 복약지도의 중요성은 이어집니다.',narration:'의약품을 받아보는 방법이 달라질수록, 복약지도의 중요성은 더 분명해집니다.',theme:'dark',art:'delivery'},
 {id:5,d:10,short:6,title:'지금 드시는 약이 있나요?',display:['“지금 드시는 약이','있나요?”'],subtitle:'약사의 짧은 질문 하나가, 중요한 정보를 찾아냅니다.',narration:'약사의 짧은 질문 하나가, 복용 전 꼭 확인해야 할 정보를 찾아냅니다.',theme:'pivot',art:'question'},
 {id:6,d:10,short:0,title:'약사의 전문성은 판매 이후에 더 빛납니다.',display:['약사의 전문성은','판매 이후에 더 빛납니다.'],subtitle:'필요한 것을 살피고, 중복을 확인하고, 함께 결정합니다.',narration:'필요한 것을 살피고, 중복을 확인하고, 고객과 함께 결정하는 일.',theme:'light',art:'magnify'},
 {id:7,d:11,short:7,title:'마음챙김은 약사의 상담을 준비합니다.',display:['마음챙김은','약사의 상담을 준비합니다.'],subtitle:'전문 상담을 위해 건강정보를 한곳에 모읍니다.',narration:'마음챙김은 고객의 건강정보를 상담에 활용할 수 있도록 모아줍니다.',theme:'green',art:'hub'},
 {id:8,d:12,short:7,title:'건강검진·복용약·영양제를 한눈에.',display:['건강검진·복용약·','영양제를 한눈에.'],subtitle:'건강기록과 생활 정보를 함께 살펴봅니다.',narration:'건강검진 기록과 복용 중인 의약품, 영양제, 생활습관 정보를 함께 살펴봅니다.',theme:'light',art:'sources'},
 {id:9,d:12,short:7,title:'AI가 먼저 정리합니다.',display:['AI가 먼저','정리합니다.'],subtitle:'성분 중복과 주의 정보를 상담 참고자료로.',narration:'AI는 성분 중복과 주의 정보를 검토할 수 있는 자료로 정리합니다.',theme:'light',art:'analysis'},
 {id:10,d:13,short:7,title:'최종 판단은 약사가 합니다.',display:['최종 판단은','약사가 합니다.'],subtitle:'AI는 보조하고, 약사는 설명하고 결정합니다.',narration:'하지만 결정은 숫자가 아닌 약사의 전문적인 상담과 검토에서 완성됩니다.',theme:'green',art:'judgment'},
 {id:11,d:12,short:7,title:'묻고, 설명하고, 확인합니다.',display:['묻고, 설명하고,','확인합니다.'],subtitle:'고객의 상황을 듣고 이해하기 쉽게 전달합니다.',narration:'고객이 왜 복용하는지 듣고, 필요한 조언을 이해하기 쉽게 전달합니다.',theme:'light',art:'conversation'},
 {id:12,d:13,short:7,title:'상담은 한 번으로 끝나지 않으니까.',display:['상담은 한 번으로','끝나지 않으니까.'],subtitle:'다음 상담을 위해 고객의 이야기를 이어갑니다.',narration:'상담 내용과 복용 정보를 정리해 다음 상담에도 이어갈 수 있습니다.',theme:'light',art:'timeline'},
 {id:13,d:11,short:0,title:'필요한 것만, 개인에게 맞게.',display:['필요한 것만,','개인에게 맞게.'],subtitle:'약사가 고객 상황에 맞는 영양 구성을 검토합니다.',narration:'약사는 고객의 상황에 맞춰 영양제 구성과 복용 계획을 검토합니다.',theme:'light',art:'personalize'},
 {id:14,d:12,short:0,title:'관리는 다음 달에도 이어집니다.',display:['관리는 다음 달에도','이어집니다.'],subtitle:'정기 관리와 재상담으로 이어지는 건강 관계.',narration:'정기 관리와 재상담으로, 약국과 고객의 관계를 이어갑니다.',theme:'light',art:'calendar'},
 {id:15,d:11,short:0,title:'데이터는 정리하고, 상담에 집중하세요.',display:['데이터는 정리하고,','상담에 집중하세요.'],subtitle:'복잡한 기록을 정리해 전문 상담에 더 많은 시간을.',narration:'상담 기록과 진행 상태를 관리해 약사가 전문적인 설명에 더 집중하도록 돕습니다.',theme:'light',art:'cleanup'},
 {id:16,d:12,short:7,title:'가격만으로 비교되지 않는 약국.',display:['가격만으로','비교되지 않는 약국.'],subtitle:'기억되는 것은 가격표보다 나를 알아주는 상담입니다.',narration:'고객이 기억하는 것은 가격표만이 아니라, 나를 알아주는 약사일 수 있습니다.',theme:'warm',art:'pharmacy'},
 {id:17,d:11,short:7,title:'약사의 역할을 넓히는 기술.',display:['약사의 역할을','넓히는 기술.'],subtitle:'AI가 약사를 대신하지 않습니다. 약사를 지원합니다.',narration:'약사를 대신하는 AI가 아니라, 약사의 전문성을 고객에게 연결하는 플랫폼.',theme:'green',art:'human'},
 {id:18,d:12,short:8,title:'마음챙김. 약국 운영의 새로운 연결.',display:['약국 운영의','새로운 연결.'],subtitle:'약사의 전문성이 이어지는 약국, 마음챙김.',narration:'고객 상담부터 맞춤 건강관리까지. 약사의 전문성이 이어지는 약국, 마음챙김과 함께하세요.',theme:'end',art:'end'}
];
window.WHY_HIGHLIGHTS=[1,2,3,5,7,8,9,10,11,12,16,17,18];
